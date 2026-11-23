import dotenv from 'dotenv';
import { resolve } from 'node:path';

const supportedEnvironments = new Set(['staging', 'preprod', 'prod']);

export async function loadConfig(
  environment = process.env.APP_ENV ?? 'staging',
) {
  if (!supportedEnvironments.has(environment)) {
    throw new Error(
      `Unsupported APP_ENV "${environment}". Choose staging, preprod, or prod.`,
    );
  }

  dotenv.config({
    path: resolve(process.cwd(), `.env.${environment}`),
    quiet: true,
  });

  const environmentModule = await import(
    `./environments/${environment}.js`
  );
  const config = environmentModule.default;

  if (!config.mongoUri) {
    throw new Error(
      `MONGODB_URI is required. Set it in .env.${environment} or in the process environment.`,
    );
  }

  if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
    throw new Error(`Invalid PORT configured for ${environment}.`);
  }

  return Object.freeze(config);
}
