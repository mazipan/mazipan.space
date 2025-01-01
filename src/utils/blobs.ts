import { getRandomInt } from '@/utils/strings';

export const randomizeBlobs = () => {
  const r1 = getRandomInt(25, 80);
  const r2 = getRandomInt(25, 80);
  const r3 = getRandomInt(25, 80);
  const r4 = getRandomInt(25, 80);

  const r11 = 100 - r1;
  const r21 = 100 - r2;
  const r31 = 100 - r3;
  const r41 = 100 - r4;

  return `${r1}% ${r11}% ${r21}% ${r2}% / ${r3}% ${r4}% ${r41}% ${r31}%`;
};
