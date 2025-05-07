import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenController } from './authen.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';

import { Role } from 'src/role/role.entity';
import { AuthenResolver } from './authen.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { GqlAuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, RefreshToken, Role]),
  ],
  providers: [
    AuthenService,
    AuthenResolver,
    JwtStrategy,
    GqlAuthGuard,
    RoleGuard,
  ],
  controllers: [AuthenController],
  exports: [GqlAuthGuard, RoleGuard],
})
export class AuthenModule {}
