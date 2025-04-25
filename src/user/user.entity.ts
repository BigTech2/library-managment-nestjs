import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import { RefreshToken } from '../refresh-token/refresh-token.entity';
import { ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Field(() => [RefreshToken])
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
