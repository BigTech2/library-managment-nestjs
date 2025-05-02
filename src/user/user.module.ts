import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
;
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from 'src/role/role.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService],
  exports: [],
  controllers: [UserController],
})
export class UserModule {}
