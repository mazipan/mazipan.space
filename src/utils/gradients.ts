import { default as twColors } from 'tailwindcss/colors';

import { getRandomElementFromArray as rnd } from '@/utils/strings';

// Tailwind v4 no longer ships `tailwindcss/types/generated/colors`,
// so derive the palette types from the runtime colors export.
type ColorKeys = keyof typeof twColors;

const colors = ['gray', 'indigo', 'yellow', 'blue', 'cyan', 'lime', 'sky', 'white'] as ColorKeys[];
const shades: number[] = [50, 100, 200];
const directions = ['to right', 'to bottom', '45deg'];

// From: https://hypercolor.dev/
const gradientStyles = [
  'linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))', // Oceanic
  'linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))', // Cotton Candy
  'linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))', // Sunset
  'linear-gradient(to right, rgb(254, 249, 195), rgb(253, 224, 71), rgb(234, 179, 8))', // Mojave
  'linear-gradient(to right, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))', // Peachy
  'linear-gradient(to right, rgb(134, 239, 172), rgb(253, 224, 71), rgb(249, 168, 212))', // Hawaii
  'linear-gradient(to right, rgb(187, 247, 208), rgb(34, 197, 94))', // Wintergreen
  'linear-gradient(to right, rgb(192, 132, 252), rgb(250, 204, 21))', // Minnesota
];

// to support white
const getRandomColor = () => {
  const rndColor = rnd(colors);
  if (rndColor === 'white') return twColors.white;
  const palette = twColors[rndColor] as Record<number, string>;
  return palette[rnd(shades)];
};

export const getRandomGradient = () =>
  `background: linear-gradient(${rnd(directions)}, ${getRandomColor()}, ${getRandomColor()})`;

export const grayGradient = `background: linear-gradient(to right, ${twColors.gray[100]}, ${twColors.gray[300]})`;

export const getRandomGradientStyle = () => {
  const rndClass = rnd(gradientStyles);
  return rndClass;
};

// djb2 hash — same input always produces the same index
const hashSlug = (slug: string): number => {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) + h) ^ slug.charCodeAt(i);
  }
  return Math.abs(h);
};

export const getGradientBySlug = (slug: string): string =>
  gradientStyles[hashSlug(slug) % gradientStyles.length];
