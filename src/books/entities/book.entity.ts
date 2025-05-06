import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DetailTopic } from 'src/detail-topics/entities/detail-topic.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

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

  @Field({  nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  bookCoverMimeType: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => DetailTopic, { nullable: true })
  @ManyToOne(() => DetailTopic, (detailTopic) => detailTopic.books)
  detailTopic: DetailTopic | null;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
