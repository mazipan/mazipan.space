import { SELECTORS } from '@/constants/dom';

import type { Mode } from '@/types/constants';

/*-------------------------------- giscus dark/light mode ------------------------------*/

const { GISCUS_WIDGET_SELECTOR, GISCUS_IFRAME_SELECTOR } = SELECTORS;

export const sendModeToGiscus = (mode: Mode): void => {
  const giscusIframeUrl = 'https://giscus.app';

  const shadowHost = document.querySelector(GISCUS_WIDGET_SELECTOR);
  const shadowRoot = shadowHost?.shadowRoot;
  if (!shadowRoot) return;

  const iframe = shadowRoot.querySelector(GISCUS_IFRAME_SELECTOR) as HTMLIFrameElement;
  if (!iframe?.contentWindow) return;

  iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: mode } } }, giscusIframeUrl);
};
