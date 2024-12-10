import { html } from 'satori-html';
import colors from 'tailwindcss/colors';

import { getRandomElementFromArray, limitString } from '@/utils/strings';

export interface TemplateProps {
  title: string;
  heroImageUrl: string;
  avatarImageUrl: string;
  siteUrl: string;
}

const clrs = ['gray', 'indigo', 'yellow', 'blue', 'cyan', 'lime', 'sky'];
const directions = ['to right', 'to bottom', '45deg'];
const shades = [50, 100, 200];
const rnd = getRandomElementFromArray;

const getRandomGradient = () =>
  `background: linear-gradient(${rnd(directions)}, ${colors[rnd(clrs)][rnd(shades)]}, ${colors[rnd(clrs)][rnd(shades)]})`;

const gradients = [
  `background: linear-gradient(to right, ${colors.gray[100]}, ${colors.gray[300]})`,
  `background: linear-gradient(to right, ${colors.indigo[200]}, ${colors.yellow[100]})`,
  `background: linear-gradient(to right, ${colors.blue[100]}, ${colors.blue[200]})`,
  `background: linear-gradient(to right, ${colors.fuchsia[200]}, ${colors.cyan[200]})`,
  `background: linear-gradient(to right, ${colors.teal[200]}, ${colors.lime[100]})`,
  `background: linear-gradient(to right, ${colors.sky[200]}, ${colors.sky[100]})`,
  `background: linear-gradient(to right, ${colors.sky[200]}, ${colors.cyan[100]})`,
];

const templateHtml = ({ title, heroImageUrl, avatarImageUrl, siteUrl }: TemplateProps) => {
  // 2 rows - max 30 chars
  // 1 row - max 18 chars
  const isLongSiteUrl = siteUrl.length > 17;

  // max 6 rows x 10-15 chars
  const limitedTitle = limitString(title, 70);

  // const randomGradient = getRandomElementFromArray(gradients);
  const randomGradient = getRandomGradient();

  return html`
    <div class="flex p-8 h-full" style="${randomGradient}">
      <div class="flex w-full flex-row justify-between text-slate-900">
        <!-- left column -->
        <div class="w-[550px] flex flex-col justify-between mr-6">
          <!-- title -->
          <div class="flex flex-grow text-6xl font-semibold mb-4">${limitedTitle}</div>

          <!-- avatar and site -->
          <div class="flex items-center ${isLongSiteUrl ? 'flex-col justify-end items-start' : ''}">
            <img
              src=${avatarImageUrl}
              alt="Nemanja Mitic"
              width="120"
              height="120"
              class="rounded-full mr-8"
            />
            <div class="flex items-center ${isLongSiteUrl ? 'mt-4 text-3xl' : 'text-4xl'}">
              <div>${siteUrl}</div>
            </div>
          </div>
        </div>

        <!-- right column -->
        <div class="w-[550px] flex items-center">
          <img src="${heroImageUrl}" class="h-full w-full rounded-md" style="object-fit: cover" />
        </div>
      </div>
    </div>
  `;
};

export default templateHtml;
