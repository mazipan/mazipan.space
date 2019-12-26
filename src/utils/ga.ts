export function trackOutbond (href: string): void {
  // @ts-ignore
  if (window && window.ga) {
    // @ts-ignore
    window.ga.send({
      hitType: 'event',
      eventCategory: 'Outbond Link',
      eventAction: 'click',
      eventLabel: href,
      transport: 'beacon'
    })
  }
}

export function trackEvent ({ eventCategory, eventAction, eventLabel }: EventProps): void {
  // @ts-ignore
  if (window && window.ga) {
    // @ts-ignore
    window.ga.send({
      hitType: 'event',
      eventCategory,
      eventAction,
      eventLabel,
    })
  }
}

export function trackTiming (): void {
  if (window.performance) {
    // @ts-ignore
    if (window.ga) {
      // @ts-ignore
      window.ga('send', {
        hitType: 'timing',
        timingCategory: 'JS Dependencies',
        timingVar: 'load',
        timingValue: Math.round(performance.now())
      })
    }
  }
}
