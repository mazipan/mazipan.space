// Checks WCAG contrast for the theme tokens. Exit code 1 if any pair fails.
// Usage: pnpm contrast
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FILES = [
  'src/styles/theme/theme-default.css',
  'src/styles/theme/keycap-tokens.css',
  'src/styles/theme/surface-tokens.css',
  'src/styles/theme/palettes.css',
];
const PALETTES = ['ocean', 'forest', 'plum'];
const KEY_COLORS = ['terracotta', 'teal', 'mustard', 'cream', 'navy'];
const HEX = /^#[0-9a-fA-F]{6}$/;

/** Parse `--th-*` custom properties declared in one scope of a CSS string. */
export function parseTokens(css, scope) {
  const escaped = scope.replace(/[.[\]'()]/g, '\\$&');
  const re =
    scope === ':root'
      ? /(?:^|[\s{}])(:root)\s*\{([^}]*)\}/g
      : new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, 'g');
  const tokens = {};
  for (const match of css.matchAll(re)) {
    const body = match[match.length - 1];
    for (const decl of body.matchAll(/--th-([\w-]+)\s*:\s*([^;]+);/g)) {
      tokens[decl[1]] = decl[2].trim();
    }
  }
  return tokens;
}

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio between two 6-digit hex colors. */
export function contrastRatio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

/** Mix two 6-digit hex colors: `pctA` of a, the rest of b. */
function mix(a, b, pctA) {
  const ch = (hex, i) => parseInt(hex.slice(i, i + 2), 16);
  const out = [1, 3, 5].map((i) => Math.round(ch(a, i) * pctA + ch(b, i) * (1 - pctA)));
  return `#${out.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

// derived tokens: the reading sheet is mixed from the page color, like in surface-tokens.css
const withDerived = (tokens, dark) => ({
  ...tokens,
  'sheet-bg': mix(tokens['base-100'], '#ffffff', dark ? 0.94 : 0.5),
});

const PAIRS = [
  // reading sheet (long text sits on it): AAA for body and headings
  ['content', 'sheet-bg', 7],
  ['headings', 'sheet-bg', 7],
  ['captions', 'sheet-bg', 4.5],
  ['links', 'sheet-bg', 4.5],
  ['links-hover', 'sheet-bg', 4.5],
  ['links-visited', 'sheet-bg', 4.5],
  ['key-edge', 'sheet-bg', 3],
  ['content', 'base-100', 7],
  ['headings', 'base-100', 7],
  ['content', 'base-200', 4.5],
  ['captions', 'base-100', 4.5],
  ['links', 'base-100', 4.5],
  ['links-visited', 'base-100', 4.5],
  ['links-hover', 'base-100', 4.5],
  ['primary-content', 'primary', 4.5],
  ['primary-content', 'primary-hover', 4.5],
  ['secondary-content', 'secondary', 4.5],
  ['accent-content', 'accent', 4.5],
  ['content', 'base-code', 4.5],
  // inline code and links sit on base-200 (my-prose.css, Details.astro)
  ['primary', 'base-200', 4.5],
  ['links', 'base-200', 4.5],
  ['links-hover', 'base-200', 4.5],
  // key edge: a real border that does not depend on depth (3:1 for UI borders)
  ['key-edge', 'base-100', 3],
  ['key-edge', 'base-200', 3],
  // home "Right now" strip uses base-200 with caption text
  ['captions', 'base-200', 4.5],
  // sticky note
  ['note-text', 'note-bg', 4.5],
  // input field: text, placeholder and border
  ['content', 'field-bg', 4.5],
  ['captions', 'field-bg', 4.5],
  ['key-edge', 'field-bg', 3],
  // light tints used as backgrounds under default black text (breadcrumbs, tags)
  ['#000000', 'primary-50', 4.5],
  ['#000000', 'primary-100', 4.5],
  ['#000000', 'primary-200', 4.5],
  ...KEY_COLORS.flatMap((c) => [
    [`key-${c}-text`, `key-${c}-face-hi`, 4.5],
    [`key-${c}-text`, `key-${c}-face-lo`, 4.5],
  ]),
];

function main() {
  const css = FILES.map((f) => {
    try {
      return readFileSync(resolve(root, f), 'utf8');
    } catch {
      return '';
    }
  }).join('\n');

  const light = parseTokens(css, ':root');
  // dark inherits any token it does not override, like the real cascade
  const dark = { ...light, ...parseTokens(css, ':root.dark') };
  const scopes = { light: withDerived(light, false), dark: withDerived(dark, true) };
  for (const name of PALETTES) {
    scopes[`${name}-light`] = withDerived(
      { ...light, ...parseTokens(css, `:root[data-theme='${name}-light']`) },
      false
    );
    scopes[`${name}-dark`] = withDerived(
      { ...dark, ...parseTokens(css, `:root[data-theme='${name}-dark']`) },
      true
    );
  }

  let failures = 0;
  for (const [scope, tokens] of Object.entries(scopes)) {
    for (const [fg, bg, min] of PAIRS) {
      const a = fg.startsWith('#') ? fg : tokens[fg];
      const b = tokens[bg];
      const label = `${scope.padEnd(12)} ${fg} on ${bg}`;
      if (!a || !b || !HEX.test(a) || !HEX.test(b)) {
        failures++;
        console.log(
          `FAIL  ${label}: missing or not a 6-digit hex (${a ?? 'none'}, ${b ?? 'none'})`
        );
        continue;
      }
      const ratio = contrastRatio(a, b);
      const ok = ratio >= min;
      if (!ok) failures++;
      console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: ${ratio.toFixed(2)} (min ${min})`);
    }
  }
  console.log(failures ? `\n${failures} failing check(s)` : '\nAll contrast checks passed');
  process.exit(failures ? 1 : 0);
}

main();
