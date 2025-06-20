import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import appConfig from './config';
import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 🔥 추가
      load: [appConfig],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('auth'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'staging')
          .default('development'),
        SERVICE_NAME: Joi.string().default('vote'),
        JWK_ISSUER: Joi.string().required(),
        API_PASS_KEY: Joi.string().required(),
        ACCESS_TOKEN_SECRET_EXPIRE: Joi.number().required(),
        REFRESH_TOKEN_SECRET_EXPIRE: Joi.number().required(),

        /**
         *  @todo 각 서버 url 정리
         */

        // 파일 스토리지 서비스
        MINIO_ROOT_USER: Joi.string().required(),
        MINIO_ROOT_PASSWORD: Joi.string().required(),
        MINIO_ENDPOINT_URL: Joi.string().required(),
        MINIO_PORT: Joi.number().required(),

        // etc
        FRONTEND_URL: Joi.string().required(),

        //sms
        ACCOUNT_SID: Joi.string().required(),
        AUTH_TOKEN: Joi.string().required(),
        TWILIO_PHONE_NUMBER: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
