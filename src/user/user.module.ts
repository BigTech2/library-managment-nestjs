import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from 'src/role/role.entity';
import { User } from './entities/user.entity';
import { Loan } from 'src/loan/entities/loan.entity';
import { Card } from 'src/card/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Loan, Card])],
  providers: [UserService],
  exports: [],
  controllers: [UserController],
})
export class UserModule {}
