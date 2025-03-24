import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '#domain/types/auth';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Auth.CognitoUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
