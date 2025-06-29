import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface AppConfig {
  messagePrefix: string;
}

export const appConfigSchema = Joi.object({
  APP_MESSAGE_PREFIX: Joi.string().default('Hello Nestjs '),
});

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    messagePrefix: process.env.APP_MESSAGE_PREFIX ?? 'Hello Nestjs ',
  }),
);
