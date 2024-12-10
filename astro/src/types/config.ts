import type { z } from 'zod';
import type { configClientSchema, configServerSchema, processEnvSchema } from '../schemas/config';

export type ConfigServerSchemaType = typeof configServerSchema;
export type ConfigServerType = z.infer<ConfigServerSchemaType>;

export type ConfigClientSchemaType = typeof configClientSchema;
export type ConfigClientType = z.infer<ConfigClientSchemaType>;

export type ProcessEnvSchemaType = typeof processEnvSchema;
export type ProcessEnvType = z.infer<ProcessEnvSchemaType>;
