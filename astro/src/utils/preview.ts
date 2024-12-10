import { CONFIG_SERVER } from '@/config/server';

/** independent from prod or dev */
export const isPreviewMode = () => CONFIG_SERVER.PREVIEW_MODE === true;
