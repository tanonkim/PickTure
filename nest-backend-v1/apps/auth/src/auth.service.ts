import { Injectable } from '@nestjs/common';
import { pem2jwk, RSA_JWK } from 'pem-jwk';
import { AppConfigService } from './config/app/config.service';

export interface TokenPayload {
  userId: string;
}

export interface KeyGenerated<T> {
  keys: T[];
}

@Injectable()
export class AuthService {
  constructor(private readonly appConfigService: AppConfigService) {}

  genJWK(): KeyGenerated<RSA_JWK> {
    const publicKey = this.appConfigService.jwtPublic;
    const jwk = pem2jwk(publicKey);

    return {
      keys: [jwk],
    };
  }
}
