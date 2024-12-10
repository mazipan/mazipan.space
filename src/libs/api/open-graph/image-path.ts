import { OG_IMAGE_PREFIXES } from '@/constants/metadata';
import { ROUTES } from '@/constants/routes';
import { getPages } from '@/libs/api/open-graph/pages';
import { removeLeadingAndTrailingSlashes } from '@/utils/paths';

import type { OgImagePrefixType } from '@/constants/metadata';

/*--------------------- getOpenGraphImagePath -------------------*/

export const getOpenGraphImagePath = (path: string): string => {
  // only to throw for invalid path
  const _prefix = getPagePrefix(path);

  const trimmedPath = removeLeadingAndTrailingSlashes(path);

  const imagePath = `${ROUTES.API.OG_IMAGES}${trimmedPath}.png`;

  // maybe, makes metadata async

  // if no image is pre-rendered set 404 image
  // const doesOgImageExists = await isExistingOgImage(trimmedPath);
  // if (!doesOgImageExists) imagePath = `${ROUTES.API.OG_IMAGES}pages/404.png`;

  return imagePath;
};

export const getPagePrefix = (path: string): OgImagePrefixType => {
  const trimmedPath = removeLeadingAndTrailingSlashes(path);
  let prefix = trimmedPath.split('/')[0];

  prefix = removeLeadingAndTrailingSlashes(prefix);

  // must not be in global scope
  const prefixes = Object.values(OG_IMAGE_PREFIXES) as string[];

  if (!prefixes.includes(prefix)) {
    const message = `Unknown path prefix requested: ${prefix}`;
    console.error(message);
    throw new Error(message);
  }

  return prefix as OgImagePrefixType;
};

// use pageId: page404 from frontmatter instead in Page layout
/** not used, pre-rendered og images in getStaticPaths */
export const isExistingOgImage = async (path: string): Promise<boolean> => {
  const trimmedPath = removeLeadingAndTrailingSlashes(path);

  const pages = await getPages();

  // without leading and trailing '/'
  const paths = Object.entries(pages).map(([path]) => path);
  const isExisting = paths.includes(trimmedPath);

  return isExisting;
};
