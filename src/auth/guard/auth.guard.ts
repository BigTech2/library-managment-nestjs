import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlcontext = ctx.getContext<{ req: Request }>();
    const request = gqlcontext.req;
    if (!request) {
      throw new Error('Request not found');
    }
    return request;
  }
}
