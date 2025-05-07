import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/role/role.entity';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';
import { Loan } from 'src/loan/entities/loan.entity';
import { Card } from 'src/card/entities/card.entity';

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

  @Field(() => [Loan])
  @OneToMany(() => Loan, (loan) => loan.user_id)
  loans: Loan[];

  @Field(() => [Card])
  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}
