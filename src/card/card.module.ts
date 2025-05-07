import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/loan/entities/loan.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthenModule } from 'src/auth/authen.module';
import { Card } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, User, Card]), AuthenModule],
  providers: [CardResolver, CardService],
})
export class CardModule {}
