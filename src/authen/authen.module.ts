import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenController } from './authen.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, RefreshToken, Role]),
  ],
  providers: [AuthenService],
  controllers: [AuthenController],
})
export class AuthenModule {}
