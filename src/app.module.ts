import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AuthenModule } from './auth/authen.module';
import { Role } from './role/role.entity';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { User } from './user/entities/user.entity';
import { BooksModule } from './books/books.module';
import { DetailTopicsModule } from './detail-topics/detail-topics.module';
import { TopicsModule } from './topics/topics.module';
import { CardModule } from './card/card.module';
import { DetailCardModule } from './detail-card/detail-card.module';
import { LoanModule } from './loan/loan.module';
import { LoanDetailModule } from './loan-detail/loan-detail.module';
import { OverduaWarningModule } from './overdua-warning/overdua-warning.module';
import { MessageModule } from './message/message.module';
import { ConversationsModule } from './conversations/conversations.module';
import { Book } from './books/entities/book.entity';
import { DetailTopic } from './detail-topics/entities/detail-topic.entity';
import { Topic } from './topics/entities/topic.entity';
import { Loan } from './loan/entities/loan.entity';
import { Card } from './card/entities/card.entity';
import { DetailCard } from './detail-card/entities/detail-card.entity';
import { LoanDetail } from './loan-detail/entities/loan-detail.entity';
import { ResetPasswordToken } from './auth/entities/reset-password.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Role,
        RefreshToken,
        Book,
        DetailTopic,
        Topic,
        Loan,
        Card,
        DetailCard,
        LoanDetail,
        ResetPasswordToken,
      ],
      synchronize: process.env.DB_SYNCHRONIZE == 'true',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    UserModule,
    RoleModule,
    RefreshTokenModule,
    AuthenModule,
    BooksModule,
    DetailTopicsModule,
    TopicsModule,
    CardModule,
    DetailCardModule,
    LoanModule,
    LoanDetailModule,
    OverduaWarningModule,
    MessageModule,
    ConversationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
