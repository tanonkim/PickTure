import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CONFIG_SERVICE } from '../jwk.constants';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  RequestUser,
} from '../jwk.interfaces';
import { ConfigService } from '../jwk.module.interfaces';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CONFIG_SERVICE) private readonly config: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const req: Request & { user: RequestUser } = context
      .switchToHttp()
      .getRequest();
    const payload = this.parseJwkPayload(req);

    // 엑세스 토큰일 경우 에러처리
    if (!this.isRefreshToken(payload)) {
      throw new UnauthorizedException('invalid token type [2]');
    }

    if (!payload.sub) {
      throw new UnauthorizedException('invalid token payload');
    }

    // user insert
    req.user = {
      id: payload.sub,
      isAdmin: false,
    };

    return true;
  }

  private parseJwkPayload(
    req: Request,
  ): IAccessTokenPayload | IRefreshTokenPayload {
    const payload: IAccessTokenPayload | IRefreshTokenPayload =
      this.verifyingToken(req);
    return payload;
  }

  private verifyingToken(
    req: Request,
  ): IAccessTokenPayload | IRefreshTokenPayload {
    const authorization = req.header('authorization');
    if (!authorization) {
      throw new UnauthorizedException('required header');
    }
    const token = authorization.replace('Bearer ', '').replace('bearer ', '');
    let rs;
    try {
      rs = this.jwtService.verify(token, {
        secret: this.config.jwtPublic,
      });
    } catch (e) {
      throw new UnauthorizedException('token parse error');
    }

    if (rs.iss !== this.config.jwtIssuer) {
      throw new UnauthorizedException('issuer mismatch');
    }

    return rs;
  }

  private isRefreshToken(
    object: IAccessTokenPayload | IRefreshTokenPayload,
  ): object is IRefreshTokenPayload {
    return 'sub' in object;
  }
}
