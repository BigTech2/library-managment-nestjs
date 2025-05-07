import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DetailCard } from 'src/detail-card/entities/detail-card.entity';
import { DetailTopic } from 'src/detail-topics/entities/detail-topic.entity';
import { LoanDetail } from 'src/loan-detail/entities/loan-detail.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity('books')
export class Book {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Field({nullable: true })
  @Column({ type: 'longtext', nullable: true })
  bookCover: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  bookCoverMimeType: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => DetailTopic, { nullable: true })
  @ManyToOne(() => DetailTopic, (detailTopic) => detailTopic.books)
  detailTopic: DetailTopic | null;

  @Field(() => [DetailCard])
  @OneToMany(() => DetailCard, (detaiCard) => detaiCard.card)
  detailCards: DetailCard[];

  @Field(() => [LoanDetail])
  @OneToMany(() => LoanDetail, (loanDetail) => loanDetail.loan)
  loanDetails: LoanDetail[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
