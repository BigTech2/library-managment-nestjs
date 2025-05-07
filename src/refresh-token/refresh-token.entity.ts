import { Field, ObjectType } from '@nestjs/graphql'; // Thêm các decorator của GraphQL
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@ObjectType() // Đánh dấu lớp RefreshToken là một ObjectType GraphQL
@Entity('refresh_tokens')
export class RefreshToken {
  @Field() // Đánh dấu id là một Field GraphQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field() // Đánh dấu token là một Field GraphQL
  @Column({ unique: true })
  token: string;

  @Field(() => User) // Đánh dấu user là một Field GraphQL, kiểu trả về là User
  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  user: User;

  @Field() // Đánh dấu expiresAt là một Field GraphQL
  @Column()
  expiresAt: Date;

  @Field() // Đánh dấu createdAt là một Field GraphQL
  @CreateDateColumn()
  createdAt: Date;
}
