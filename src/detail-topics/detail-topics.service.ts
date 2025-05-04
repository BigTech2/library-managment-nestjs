import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailTopicInput } from './dto/create-detail-topic.input';
import { UpdateDetailTopicInput } from './dto/update-detail-topic.input';
import { DetailTopic } from './entities/detail-topic.entity';
import { TopicsService } from 'src/topics/topics.service';

@Injectable()
export class DetailTopicsService {
  constructor(
    @InjectRepository(DetailTopic)
    private readonly detailTopicRepository: Repository<DetailTopic>,
    private readonly topicsService: TopicsService
  ) { }

  async create(createDetailTopicInput: CreateDetailTopicInput): Promise<DetailTopic> {



    try {
      const { topicId, ...detailTopics } = createDetailTopicInput;
      const detailTopic = this.detailTopicRepository.create(detailTopics)

      if (topicId) {
        const topic = await this.topicsService.findOne(topicId)

        if (!topic) {
          throw new Error(`Detail topic with ID ${topicId} not found`);
        }
        detailTopic.topic = topic
      }
      return this.detailTopicRepository.save(detailTopic)
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`);
    }
  }

  async findAll(): Promise<DetailTopic[]> {
    try {
      const detailTopics = this.detailTopicRepository.find(
        {
          relations: ['topic', 'books']
        }
      )
      return detailTopics
    } catch (error) {
      throw new Error(`Failded to get detailTopics ${error.message} `)
    }
  }

  async findOne(id: number): Promise<DetailTopic> {
    const detailTopic = await this.detailTopicRepository.findOne({
      where: { id },
      relations: ['topic', 'books'],
    });

    if (!detailTopic) {
      throw new NotFoundException(`Detail topic with ID ${id} not found`);
    }

    return detailTopic;
  }

  async update(id: number, updateDetailTopicInput: UpdateDetailTopicInput): Promise<DetailTopic> {
    try {
      const {id, topicId, ...detailTopics}  = updateDetailTopicInput;

      const detailTopic = await this.findOne(id);
      Object.assign(detailTopic, detailTopics);

      if(topicId !== undefined){
        if (topicId) {
          const topic = await this.topicsService.findOne(topicId)
          if(topic){
            detailTopic.topic = topic
          }else{
            detailTopic.topic = null
          }
        }
      }
      return await this.detailTopicRepository.save(detailTopic)

    } catch (error) {
      throw new Error(`Failed to update detailTopic: ${error.message}`)
    }
  }
  async remove(id: number): Promise<DetailTopic> {
    console.log(id)
    try {
      const detailTopic = await this.findOne(id);
      if (detailTopic) {
        await this.detailTopicRepository.softDelete(id); 
        detailTopic.deletedAt = new Date();
      }
      return detailTopic;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete detailTopics: ${error.message}`);
    }
  }
}
