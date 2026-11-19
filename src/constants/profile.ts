export const PROFILE = {
  TAGLINE:
    'I build web products from the ground up, make them fast and scalable, guide tech migrations, and mentor other developers.',
  /** Shown in the home "Right now" strip as "Part of ...". Empty hides it. Wego since Mar 2025 (GovTech Edu before). */
  CURRENT_POSITION: 'Part of Wego.',
  /** Shows the "Available for hire" status on About and Resume. Set to false when it is no longer true. */
  AVAILABLE_FOR_HIRE: true,
  /** Shown in the home "Right now" strip. The deploy time in the footer uses the same zone (see `APP_DEPLOY_AT` in package.json). */
  LOCATION: 'Jakarta, Indonesia',
  TIMEZONE: 'GMT+7',
  /** Minutes east of UTC for `TIMEZONE`; the home page compares it with the visitor's clock in the browser. */
  TIMEZONE_OFFSET_MINUTES: 420,
  HIGHTLIGHT: [
    '⚛️ React.js x TypeScript',
    '💼 Ex: GovTech Edu, Sayurbox, Tokopedia, Bizzy Indonesia, Blibli, & SML Technologies.',
    '🛟 Active contributor to open source project in PHPID, React.js ID, & KawalCovid19.',
  ],
};
