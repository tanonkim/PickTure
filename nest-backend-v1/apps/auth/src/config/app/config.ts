import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  JWK_ISSUER: process.env.JWK_ISSUER,
  SERVICE_NAME: process.env.SERVICE_NAME,
  API_PASS_KEY: process.env.API_PASS_KEY,
  SALT_LENGTH: process.env.SALT_LENGTH,
  ACCESS_TOKEN_SECRET_EXPIRE: process.env.ACCESS_TOKEN_SECRET_EXPIRE,
  REFRESH_TOKEN_SECRET_EXPIRE: process.env.REFRESH_TOKEN_SECRET_EXPIRE,

  /**
   *  @todo 각 서버 url 정리
   */

  // minio
  MINIO_ROOT_USER: process.env.MINIO_ROOT_USER,
  MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD,
  MINIO_ENDPOINT_URL: process.env.MINIO_ENDPOINT_URL,
  MINIO_PORT: process.env.MINIO_PORT,

  FRONTEND_URL: process.env.FRONTEND_URL,

  ACCOUNT_SID: process.env.ACCOUNT_SID,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
}));
