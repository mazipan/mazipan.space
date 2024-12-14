import { getRandomInt } from '@/utils/strings';

export const randomizeBlobs = () => {
  const r1 = getRandomInt(15, 50);
  const r2 = getRandomInt(60, 70);
  const r3 = getRandomInt(10, 90);
  const r4 = getRandomInt(10, 90);

  const r5 = getRandomInt(10, 80);
  const r6 = getRandomInt(40, 90);
  const r7 = getRandomInt(10, 50);
  const r8 = getRandomInt(10, 90);

  return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
};
