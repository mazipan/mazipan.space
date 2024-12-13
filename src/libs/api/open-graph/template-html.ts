import { html } from 'satori-html';

import { getRandomGradientStyle } from '@/utils/gradients';
import { limitString } from '@/utils/strings';

export interface TemplateProps {
  title: string;
  heroImageUrl: string;
  avatarImageUrl: string;
  siteUrl: string;
}

const templateHtml = ({ title, heroImageUrl, avatarImageUrl, siteUrl }: TemplateProps) => {
  // 2 rows - max 30 chars
  // 1 row - max 20 chars, max that fits - 12
  const isLongSiteUrl = siteUrl.length > 20;

  // max 6 rows x 10-15 chars
  const limitedTitle = limitString(title, 70);

  return html`
    <div
      class="flex p-8 h-full w-full"
      style="font-family:'Space Grotesk';background-image:${getRandomGradientStyle()};"
    >
      <div class="flex w-full flex-row justify-between text-slate-900">
        <!-- left column -->
        <div class="w-[550px] flex flex-col justify-between mr-6">
          <!-- title -->
          <div class="flex flex-grow text-6xl font-semibold mb-4">${limitedTitle}</div>

          <!-- avatar and site -->
          <div class="flex items-center ${isLongSiteUrl ? 'flex-col justify-end items-start' : ''}">
            <img
              src=${avatarImageUrl}
              alt=${limitedTitle}
              width="80"
              height="80"
              class="rounded-full mr-8"
            />
            <div class="flex items-center ${isLongSiteUrl ? 'mt-4 text-3xl' : 'text-4xl'}">
              <div>${siteUrl}</div>
            </div>
          </div>
        </div>

        <!-- right column -->
        <div class="w-[550px] flex items-center">
          <img src="${heroImageUrl}" class="h-full w-full rounded-2xl" style="object-fit: cover" />
        </div>
      </div>
    </div>
  `;
};

export default templateHtml;
