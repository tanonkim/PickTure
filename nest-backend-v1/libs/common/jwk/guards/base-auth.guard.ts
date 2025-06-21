import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CONFIG_SERVICE } from '../jwk.constants';
import { ConfigService } from '../jwk.module.interfaces';
import InternalRequestException from '@app/common/exceptions/internal-request.exception';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(@Inject(CONFIG_SERVICE) private readonly config: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new InternalRequestException(
        HttpStatus.UNAUTHORIZED,
        'Unauthorized Error [None]',
      );
    }
    if (!authorization.includes('Basic')) {
      throw new InternalRequestException(
        HttpStatus.UNAUTHORIZED,
        'Unauthorized Error [None Basic]',
      );
    }
    const userNameAndPwd = authorization
      .replace('Basic ', '')
      .replace('basic ', '');
    if (userNameAndPwd.length <= 0) {
      throw new InternalRequestException(
        HttpStatus.UNAUTHORIZED,
        'Unauthorized Error [Basic Token None]',
      );
    }
    const basicAuth = atob(userNameAndPwd).split(':');
    if (basicAuth.length !== 2) {
      throw new InternalRequestException(
        HttpStatus.UNAUTHORIZED,
        'Unauthorized Error [Basic Token Error]',
      );
    }
    if (!basicAuth[0]) {
      throw new InternalRequestException(
        HttpStatus.UNAUTHORIZED,
        'Unauthorized Error [Basic Token User]',
      );
    }
    // Managed passwords in the process env
    const key = this.config.apiPassKey;
    if (!key) {
      throw new InternalRequestException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Unauthorized Error [Key Error]',
      );
    }
    if (basicAuth[1] !== key) {
      throw new InternalRequestException(
        HttpStatus.UNAUTHORIZED,
        'Unauthorized Error [Basic Tokne Pass]',
      );
    }
    console.info(`Form Auth: ${basicAuth[0]}`);
    return true;
  }
}
