const BASE_FONT = 14;
export default (px: number) => {
  return `${(px / BASE_FONT).toFixed(3)}rem`;
};
