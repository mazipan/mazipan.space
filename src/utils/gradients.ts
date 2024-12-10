import { default as twColors } from 'tailwindcss/colors';

import { getRandomElementFromArray as rnd } from '@/utils/strings';

import type { DefaultColors } from 'tailwindcss/types/generated/colors';

type ColorKeys = keyof DefaultColors;
type ShadeKeys = keyof DefaultColors[ColorKeys];

const colors = ['gray', 'indigo', 'yellow', 'blue', 'cyan', 'lime', 'sky', 'white'] as ColorKeys[];
const shades = [50, 100, 200] as ShadeKeys[];
const directions = ['to right', 'to bottom', '45deg'];

// to support white
const getRandomColor = () => {
  const rndColor = rnd(colors);
  return rndColor === 'white' ? rndColor : twColors[rndColor][rnd(shades)];
};

export const getRandomGradient = () =>
  `background: linear-gradient(${rnd(directions)}, ${getRandomColor()}, ${getRandomColor()})`;

export const grayGradient = `background: linear-gradient(to right, ${twColors.gray[100]}, ${twColors.gray[300]})`;
