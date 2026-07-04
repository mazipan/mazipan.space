import { html } from 'satori-html';

import { limitString } from '@/utils/strings';

export interface TemplateProps {
  title: string;
  heroImageUrl: string;
  siteUrl: string;
}

const templateHtml = ({ title, heroImageUrl, siteUrl }: TemplateProps) => {
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

      <!-- glass card — kept inside the 10 % title-safe zone on all sides:
           outer margin 72 px L/R + inner padding 48 px = 120 px total (10 % of 1200)
           outer margin 64 px bottom + inner padding 40 px = 104 px total (>10 % of 628) -->
      <div
        style="position: absolute; bottom: 64px; left: 72px; right: 72px; display: flex; flex-direction: column; background: rgba(0, 0, 0, 0.60); border-radius: 20px; padding: 40px 48px; border: 1px solid rgba(255, 255, 255, 0.18);"
      >
        <!-- title -->
        <div
          style="color: white; font-size: 52px; font-weight: 600; line-height: 1.25; margin-bottom: 24px; display: flex;"
        >
          ${limitedTitle}
        </div>

        <!-- site url -->
        <div
          style="color: rgba(255, 255, 255, 0.88); font-size: ${isLongSiteUrl ? '28px' : '34px'}; display: flex; align-items: center;"
        >
          ${siteUrl}
        </div>
      </div>
    </div>
  `;
};

export default templateHtml;
