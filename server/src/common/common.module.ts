import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import * as Joi from 'joi';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/.development.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APPLICATION_PORT: Joi.number().default(3000),
        DATABASE_CONNECTION_STRING: Joi.string().required(),
      }),
      validationOptions: {
        // allowUnknown: false, TODO: fix this flag. on windowns there is additional env vars that are making launching the server fail
        abortEarly: true,
      },
    }),
    LoggerModule
  ]
})
export class CommonModule {}
