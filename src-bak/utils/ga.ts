import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

export function trackOutbond(href: string, category?: string): void {
  // @ts-ignore
  if (trackCustomEvent) {
    // @ts-ignore
    trackCustomEvent({
      category: category ?? 'Outbond Link',
      action: 'click',
      label: href,
      transport: 'beacon',
    });
  }
}

export function trackEvent({ eventCategory, eventAction, eventLabel }: EventProps): void {
  // @ts-ignore
  if (trackCustomEvent) {
    // @ts-ignore
    trackCustomEvent({
      category: eventCategory,
      action: eventAction,
      label: eventLabel,
    });
  }
}

export function trackTiming(): void {
  if (window.performance) {
    // @ts-ignore
    if (trackCustomEvent) {
      // @ts-ignore
      trackCustomEvent({
        category: 'Timing',
        action: 'load',
        label: 'JS Deps',
        value: `${Math.round(performance.now())}`,
      });
    }
  }
}

export function trackJsErrors(): void {
  if (typeof window !== 'undefined') {
    const handleError = (event: ErrorEvent) => {
      trackCustomEvent({
        category: 'JS Error',
        action: 'js-error',
        label: 'ErrorEvent',
        value: `${event.message}`,
      });
    };

    // @ts-ignore
    const handleErrorRejection = (e: any) => {
      if (e.reason) {
        trackCustomEvent({
          category: 'JS Error',
          action: 'js-error',
          label: 'UnhandledRejection',
          value: `${e.reason.stack || e.reason.message}`,
        });
      }
    };

    window.addEventListener('unhandledrejection', handleErrorRejection);
    window.addEventListener('error', handleError);
  }
}

// @ts-ignore
export function trackClick({ eventCategory, eventLabel }): void {
  // @ts-ignore
  if (trackCustomEvent) {
    // @ts-ignore
    trackCustomEvent({
      category: eventCategory,
      action: 'click',
      label: eventLabel,
    });
  }
}

export function trackView(pageGroup: string): void {
  // @ts-ignore
  if (trackCustomEvent) {
    // @ts-ignore
    trackCustomEvent({
      category: pageGroup,
      action: 'view',
      label: typeof window !== 'undefined' ? `view - ${window.location.pathname}` : '',
    });
  }
}
