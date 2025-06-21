import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { RequestUser } from './jwk.interfaces';

export const ROLES_KEY = 'roles';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
