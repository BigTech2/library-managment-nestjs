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
import { ConfigModule } from '@nestjs/config';

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
      entities: [User, Role, RefreshToken],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
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
