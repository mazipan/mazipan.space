import { NODE_ENV as NODE_ENV_STRING, PREVIEW_MODE } from 'astro:env/server';

import { configServerSchema } from '@/schemas/config';
import { CONFIG_CLIENT } from '@/config/client';
import { prettyPrintObject } from '@/utils/log';
import { validateData } from '@/utils/validation';

import type { ConfigServerType } from '@/types/config';

// cast type
const NODE_ENV = NODE_ENV_STRING as ConfigServerType['NODE_ENV'];

/** SSG - all env vars are build time only. */
const configServerData: ConfigServerType = { NODE_ENV, PREVIEW_MODE };

export const CONFIG_SERVER = validateData(configServerData, configServerSchema);

// print merged config
export const MERGED_CONFIG = { ...CONFIG_SERVER, ...CONFIG_CLIENT };

// move in onAppLoad handler
prettyPrintObject(MERGED_CONFIG, 'parsed CONFIG');
