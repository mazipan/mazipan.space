// all relative imports in env subtree
import { envField } from 'astro/config';

import dotenv from 'dotenv';

import { nodeEnvValues, processEnvSchema } from '../schemas/config';
import { prettyPrintObject } from '../utils/log';
import { getHostnameFromUrl } from '../utils/urls';
import { validateData } from '../utils/validation';

import type { ProcessEnvType } from '../types/config';

/*------------------ load .env file -----------------*/

// import.meta.env is not available in astro.config.mjs, only after the config is loaded.
// ! MUST use process.env for vars used in astro.config.mjs.
// https://github.com/withastro/astro/issues?q=.env+file+not+loaded

const NODE_ENV = process.env.NODE_ENV;

if (!nodeEnvValues.includes(NODE_ENV)) {
  // eslint-disable-next-line no-console
  console.error('Invalid process.env.NODE_ENV: ', NODE_ENV);
  throw new Error('Invalid process.env.NODE_ENV');
}

const envFileName = `.env.${NODE_ENV}`;
dotenv.config({ path: envFileName });

/*------------------ validate processEnvData -----------------*/

const processEnvData: ProcessEnvType = {
  NODE_ENV: process.env.NODE_ENV,
  PREVIEW_MODE: process.env.PREVIEW_MODE,
  SITE_URL: process.env.SITE_URL,
  PLAUSIBLE_SCRIPT_URL: process.env.PLAUSIBLE_SCRIPT_URL,
  PLAUSIBLE_DOMAIN: process.env.PLAUSIBLE_DOMAIN,
};

prettyPrintObject(processEnvData, 'received PROCESS_ENV');

export const PROCESS_ENV = validateData(processEnvData, processEnvSchema);

/*------------------ experimental.env.schema -----------------*/

export const envSchema = {
  schema: {
    // server
    NODE_ENV: envField.string({
      context: 'server',
      access: 'public',
      default: 'development',
    }),
    PREVIEW_MODE: envField.boolean({
      context: 'server',
      access: 'public',
      default: false,
    }),
    // client
    SITE_URL: envField.string({
      context: 'client',
      access: 'public',
      // default: omit to have explicit validation
    }),
    PLAUSIBLE_SCRIPT_URL: envField.string({
      context: 'client',
      access: 'public',
      optional: true,
    }),
    PLAUSIBLE_DOMAIN: envField.string({
      context: 'client',
      access: 'public',
      optional: true,
      default: getHostnameFromUrl(PROCESS_ENV.SITE_URL),
    }),
  },
};
