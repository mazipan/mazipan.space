import type { ImageSizes } from '@/types/constants';

/** matches tailwindcss/defaultTheme.screens */

export const TW_SCREENS = {
  /** added, for Image, bellow xs */
  XXS: 320,
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  _2XL: 1536,
  HEIGHTS: {
    XXS: 180,
    XS: 268,
    SM: 360,
    MD: 432,
    LG: 576,
    XL: 720,
    _2XL: 864,
  },
} as const;

// add quality and loading in future
export const IMAGE_SIZES = {
  FIXED: {
    AVATAR: {
      width: 48,
      height: 48,
    },
    POST_CARD_SMALL: {
      width: 215,
      height: 120,
    },
    _404: {
      width: TW_SCREENS.MD,
      height: TW_SCREENS.HEIGHTS.MD,
    },
    MDX_XXS: { width: TW_SCREENS.XXS },
    MDX_XS: { width: TW_SCREENS.XS },
    MDX_SM: { width: TW_SCREENS.SM },
    MDX_MD: { width: TW_SCREENS.MD },
    MDX_LG: { width: TW_SCREENS.LG },
    MDX_XL: { width: TW_SCREENS.XL },
    /** width and height required for remote images */
    MDX_XXS_16_9: { width: TW_SCREENS.XXS, height: TW_SCREENS.HEIGHTS.XXS },
    MDX_XS_16_9: { width: TW_SCREENS.XS, height: TW_SCREENS.HEIGHTS.XS },
    MDX_SM_16_9: { width: TW_SCREENS.SM, height: TW_SCREENS.HEIGHTS.SM },
    MDX_MD_16_9: { width: TW_SCREENS.MD, height: TW_SCREENS.HEIGHTS.MD },
    MDX_LG_16_9: { width: TW_SCREENS.LG, height: TW_SCREENS.HEIGHTS.LG },
    MDX_XL_16_9: { width: TW_SCREENS.XL, height: TW_SCREENS.HEIGHTS.XL },
  },
  RESPONSIVE: {
    POST_CARD: {
      widths: [TW_SCREENS.XXS, TW_SCREENS.SM],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XXS}px, ${TW_SCREENS.SM}px`,
    },
    POST_HERO: {
      // widths: [TW_SCREENS.XXS, TW_SCREENS.SM, TW_SCREENS.MD, TW_SCREENS.LG],
      widths: [TW_SCREENS.XXS, TW_SCREENS.SM, TW_SCREENS.MD, TW_SCREENS.LG, TW_SCREENS.XL],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XXS}px, (max-width: ${TW_SCREENS.MD}px) ${TW_SCREENS.SM}px, (max-width: ${TW_SCREENS.XL}px) ${TW_SCREENS.LG}px, ${TW_SCREENS.XL}px`,
      // sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XXS}px, (max-width: ${TW_SCREENS.MD}px) ${TW_SCREENS.SM}px, (max-width: ${TW_SCREENS.XL}px) ${TW_SCREENS.MD}px, ${TW_SCREENS.LG}px`,
    },
    PROJECT_CARD: {
      widths: [TW_SCREENS.XXS, TW_SCREENS.SM],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XXS}px, ${TW_SCREENS.SM}px`,
    },
    MDX_EXPAND_LG: {
      widths: [TW_SCREENS.XXS, TW_SCREENS.SM, TW_SCREENS.MD, TW_SCREENS.LG, TW_SCREENS.XL],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XXS}px, (max-width: ${TW_SCREENS.MD}px) ${TW_SCREENS.SM}px, (max-width: ${TW_SCREENS.XL}px) ${TW_SCREENS.LG}px, ${TW_SCREENS.XL}px`,
      // for debugging
      // class: `border-8 border-blue-500 [@media(max-width:475px)]:!border-yellow-300 [@media(max-width:768px)]:border-orange-500 [@media(max-width:1280px)]:border-red-500`,
    },
  },
} as const satisfies ImageSizes;
