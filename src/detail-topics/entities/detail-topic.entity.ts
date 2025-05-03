import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@ObjectType()
@Entity('detailTopics')
export class DetailTopic {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number; 

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field(() => [Book], { nullable: true })
  @OneToMany(() => Book, (book) => book.detailTopic)
  books: Book[];

  @Field(() => Topic)
  @ManyToOne(() => Topic, (topic) => topic.detailTopics)
  topic: Topic;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
