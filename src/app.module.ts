import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AuthenModule } from './authen/authen.module';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hoangdeptrai',
      database: 'library_manager_db',
      entities: [User, Role, RefreshToken],
      synchronize: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
