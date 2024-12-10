import fs from 'fs/promises';
import path from 'path';

import satori from 'satori';
import sharp from 'sharp';

import { FILE_PATHS } from '@/constants/file-paths';
import { CONFIG_CLIENT } from '@/config/client';
import { getPages } from '@/libs/api/open-graph/pages';
import templateHtml from '@/libs/api/open-graph/template-html';
import { removeTrailingSlash } from '@/utils/paths';
import { trimHttpProtocol } from '@/utils/strings';

import type { APIContext, APIRoute } from 'astro';

const { SITE_URL } = CONFIG_CLIENT;
const { FONTS_FOLDER, OG_FOLDER, IMAGE_404, AVATAR } = FILE_PATHS;

export const getStaticPaths = async () => {
  const pages = await getPages();

  // object to array of tuples
  const paths = Object.entries(pages).map(([path, page]) => ({
    params: { route: path },
    props: { page },
  }));

  return paths;
};

export const GET: APIRoute = async ({ props }: APIContext) => {
  // limit number of chars
  const { title, heroImage, pageId } = props.page;

  // resize images in template in CSS only, not in sharp

  // avatarImage
  const avatarImageBase64Url = await getBase64Image(AVATAR);

  // heroImage
  let heroImagePath: string;

  switch (true) {
    case Boolean(heroImage?.fsPath):
      heroImagePath = heroImage?.fsPath;
      break;
    // hardcoded in 404.mdx frontmatter
    case pageId === 'page404':
      heroImagePath = IMAGE_404;
      break;

    // fallback to random default image
    default:
      heroImagePath = await getRandomImage(OG_FOLDER);
      break;
  }

  const heroImageBase64Url = await getBase64Image(heroImagePath);

  const templateProps = {
    title,
    heroImageUrl: heroImageBase64Url,
    avatarImageUrl: avatarImageBase64Url,
    siteUrl: trimHttpProtocol(SITE_URL),
  };

  const fontData = await fs.readFile(`${FONTS_FOLDER}inter-regular.woff`);

  const svg = await satori(templateHtml(templateProps) as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer);
};

/*-------------------------------- utils ------------------------------*/

const getBase64Image = async (imagePath: string): Promise<string> => {
  const imageData = await fs.readFile(imagePath);

  const imageType = getImageType(imagePath);
  const imageBase64 = Buffer.from(imageData).toString('base64');
  const imageBase64Url = `data:image/${imageType};base64,${imageBase64}`;

  return imageBase64Url;
};

const getImageType = (imagePath: string) => {
  const extension = path.extname(imagePath).toLowerCase();

  let imageType: string;
  switch (extension) {
    case '.png':
      imageType = 'png';
      break;
    case '.jpg':
    case '.jpeg':
      imageType = 'jpeg';
      break;
    default:
      throw new Error('Unsupported heroImage file extension');
  }

  return imageType;
};

const getRandomImage = async (folderPath: string): Promise<string> => {
  const trimmedFolderPath = removeTrailingSlash(folderPath);

  const files = await fs.readdir(trimmedFolderPath);

  // omit ./, ../
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
  });

  if (imageFiles.length === 0) throw new Error(`No default og images found in: ${folderPath}`);

  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  const randomImage = imageFiles[randomIndex];

  const randomImageWithPath = `${trimmedFolderPath}/${randomImage}`;

  return randomImageWithPath;
};
