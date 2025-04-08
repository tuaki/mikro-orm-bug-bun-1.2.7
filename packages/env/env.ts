import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const internalEnv = typeof process !== 'undefined' ? process.env : import.meta.env;

export const env = createEnv({
    server: {
        NODE_ENV: z.enum([ 'development', 'production', 'test' ]).default('production'),
        DATABASE_USER: z.string(),
        DATABASE_PASSWORD: z.string(),
        DATABASE_NAME: z.string(),
        DATABASE_URL: z.string(),
    },
    emptyStringAsUndefined: true,
    runtimeEnv: internalEnv,
});
