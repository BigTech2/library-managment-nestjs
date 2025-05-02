import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { jwtPayload } from '../strategies/jwt.strategy';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const gqlcontext = ctx.getContext<{ req: Request }>();
    const req = gqlcontext.req as Request & { user?: jwtPayload };   
    const user = req.user;
    return !!user && requiredRole.includes(user.role);
  }
}
