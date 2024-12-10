declare namespace NodeJS {
  /** for astro.config.mjs */
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly SITE_URL: string;
    /** Optional in .env file but always defined in type. Default: false. */
    readonly PREVIEW_MODE: boolean;
  }
}

// same type repeated

/** for import.meta.env for the rest of the code */
interface ImportMetaEnv {
  // NODE_ENV, SITE_URL... included by default

  readonly PREVIEW_MODE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
