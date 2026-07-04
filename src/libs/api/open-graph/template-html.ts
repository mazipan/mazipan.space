import { html } from 'satori-html';

import { limitString } from '@/utils/strings';

export interface TemplateProps {
  title: string;
  heroImageUrl: string;
  avatarImageUrl: string;
  siteUrl: string;
}

const templateHtml = ({ title, heroImageUrl, avatarImageUrl, siteUrl }: TemplateProps) => {
  const isLongSiteUrl = siteUrl.length > 20;
  const limitedTitle = limitString(title, 70);

  return html`
    <div
      style="font-family:'Space Grotesk'; position: relative; display: flex; width: 1200px; height: 628px; overflow: hidden;"
    >
      <!-- full-bleed background image -->
      <img
        src="${heroImageUrl}"
        style="position: absolute; top: 0; left: 0; width: 1200px; height: 628px; object-fit: cover;"
      />

      <!-- glass card anchored to bottom -->
      <div
        style="position: absolute; bottom: 48px; left: 48px; right: 48px; display: flex; flex-direction: column; background: rgba(0, 0, 0, 0.60); border-radius: 20px; padding: 36px 44px; border: 1px solid rgba(255, 255, 255, 0.18);"
      >
        <!-- title -->
        <div
          style="color: white; font-size: 52px; font-weight: 600; line-height: 1.25; margin-bottom: 24px; display: flex;"
        >
          ${limitedTitle}
        </div>

        <!-- avatar + site url -->
        <div style="display: flex; align-items: center;">
          <img
            src="${avatarImageUrl}"
            alt="${limitedTitle}"
            style="width: 56px; height: 56px; border-radius: 28px; margin-right: 20px; border: 2px solid rgba(255, 255, 255, 0.5); flex-shrink: 0;"
          />
          <div
            style="color: rgba(255, 255, 255, 0.88); font-size: ${isLongSiteUrl ? '28px' : '34px'}; display: flex; align-items: center;"
          >
            ${siteUrl}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default templateHtml;
