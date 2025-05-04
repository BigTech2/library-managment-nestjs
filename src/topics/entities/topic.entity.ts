import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DetailTopic } from 'src/detail-topics/entities/detail-topic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@ObjectType()
@Entity('topics')
export class Topic {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  topicName: string;

  @Field(() => [DetailTopic])
  @OneToMany(() => DetailTopic, (detailTopic) => detailTopic.topic)
  detailTopics: DetailTopic[];

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
