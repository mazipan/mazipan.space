import { z } from 'zod';

import type { ZodSchema } from 'zod';

export const zodErrorToString = (error: z.ZodError): string => {
  return error.errors.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`).join(', ');
};

export const validateData = <T extends ZodSchema>(config: z.infer<T>, schema: T): z.infer<T> => {
  const parsedConfig = schema.safeParse(config);

  if (!parsedConfig.success) {
    const zodErrors = zodErrorToString(parsedConfig.error);
    const errorMessage = `Zod validation failed: , ${zodErrors}`;

    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const { data: parsedConfigData } = parsedConfig;

  return parsedConfigData;
};
