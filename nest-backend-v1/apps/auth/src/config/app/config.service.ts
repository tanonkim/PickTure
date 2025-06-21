import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  private get<T>(key: string) {
    const value = this.configService.get<T>(key);
    if (value == null) {
      throw new InternalServerErrorException(`app env config error ${key}`);
    }
    return value;
  }

  get env(): string {
    return this.get<string>('app.NODE_ENV');
  }

  get appName(): string {
    return this.get<string>('app.APP_NAME');
  }

  // 비공개 키는 유저 서버만 가지고 있음
  get jwtPrivate(): string {
    const filePath = 'apps/auth/src/certs/private-key.pem';
    let str;
    try {
      str = readFileSync(filePath).toString();
    } catch (e) {
      throw new InternalServerErrorException('app env config error - private');
    }
    return str;
  }

  // 공개키 auth 만 비공개 키를 가지고 있음
  get jwtPublic(): string {
    const filePath = 'libs/common/certs/public-key.pem';
    let str;
    try {
      str = readFileSync(filePath).toString();
    } catch (e) {
      throw new InternalServerErrorException('app env config error - public');
    }
    return str;
  }

  // JWT 발급 주체 서버 공통
  get jwtIssuer(): string {
    return this.get<string>('app.JWK_ISSUER');
  }

  // 서비스 이름 - 로그용
  get serviceName() {
    return this.get<string>('app.SERVICE_NAME');
  }

  get apiPassKey() {
    return this.get<string>('app.API_PASS_KEY');
  }

  get saltLength() {
    return Number(this.get<number>('app.SALT_LENGTH'));
  }

  get accessTokenExpire() {
    return Number(this.get<number>('app.ACCESS_TOKEN_SECRET_EXPIRE'));
  }
  get refreshTokenExpire() {
    return Number(this.get<number>('app.REFRESH_TOKEN_SECRET_EXPIRE'));
  }

  /**
   *  @todo 각 서버 url 정리
   */

  // 스토리지 서비스
  get minioAccessKey() {
    return this.get<string>('app.MINIO_ROOT_USER');
  }
  get minioSecretKey() {
    return this.get<string>('app.MINIO_ROOT_PASSWORD');
  }
  get minioEndPoint() {
    return this.get<string>('app.MINIO_ENDPOINT_URL');
  }
  get minioPort() {
    return Number(this.get<string>('app.MINIO_PORT'));
  }

  get frontEndUrl() {
    return this.get<string>('app.FRONTEND_URL');
  }

  // SMS
  get accountSId() {
    return this.get<string>('app.ACCOUNT_SID');
  }
  get authToken() {
    return this.get<string>('app.AUTH_TOKEN');
  }
}
