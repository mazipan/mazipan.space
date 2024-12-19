import { definePlugin } from '@expressive-code/core';

export function pluginLanguageBadge() {
  return definePlugin({
    name: 'Language Badge',
    baseStyles: ({ cssVar }) => `
      [data-language]::before {
        position: absolute;
        z-index: 2;
        right: calc(${cssVar('borderWidth')} + ${cssVar('uiPaddingInline')} / 2);
        top: calc(${cssVar('borderWidth')} + 0.35rem);
        padding: 0.1rem 0.5rem;
        box-shadow: 0 0 1px 1px ${cssVar('codeBackground')};
        content: attr(data-language);
        font-size: 0.7rem;
        border-radius: ${cssVar('borderRadius')};
        pointer-events: none;
        transition: opacity 0.2s;
        color: #cabffd;
        background-color: #4a1d96;
      }

      [data-language="shell"]::before,
      [data-language="bash"]::before {
        color: #f8b4d9;
        background-color: #751a3d;
      }

      [data-language="yaml"]::before,
      [data-language="yml"]::before {
        color: #faca15;
        background-color: #633112;
      }

      [data-language="css"]::before,
      [data-language="scss"]::before {
        color: #000;
        background-color: #1d4ed8;
      }

      [data-language="svelte"]::before {
        color: #FFF;
        background-color: #f96743;
      }

      [data-language="vue"]::before {
        color: #84e1bc;
        background-color: #014737;
      }

      [data-language="ts"]::before,
      [data-language="tsx"]::before,
      [data-language="typescript"]::before {
        color: #000;
        background-color: #93c5fd;
      }
      [data-language="js"]::before,
      [data-language="jsx"]::before,
      [data-language="mjs"]::before,
      [data-language="javascript"]::before {
        color: #000;
        background-color: #fcd34d;
      }

      /* Prevent the language badge from overlapping the copy button */
      .frame:not(.has-title):not(.is-terminal) {
        /* If the copy button is always visible, move it to the side */
        @media not (hover: hover) {
          .copy {
            margin-right: 3rem;
          }
        }

        /* If it's only visible on hover, hide the language badge on hover */
        @media (hover: hover) {
          &:hover [data-language]::before {
            opacity: 0;
          }
        }
      }
    `,
  });
}
