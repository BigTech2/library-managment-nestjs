import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DetailCard } from 'src/detail-card/entities/detail-card.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('card')
export class Card {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'integer' })
  quantity: number;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  isLoaned: boolean;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cards)
  user: User;

  @Field(() => [DetailCard])
  @OneToMany(() => DetailCard, (detaiCard) => detaiCard.card)
  detailCards: DetailCard[];
}
