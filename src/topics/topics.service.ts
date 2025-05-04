import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTopicInput } from './dto/create-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { Sign } from 'crypto';

@Injectable()
export class TopicsService {


  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>

  ) { }


  async create(createTopicInput: CreateTopicInput): Promise<Topic> {
    try {

      const createTopic = this.topicRepository.create(createTopicInput)
      return await this.topicRepository.save(createTopic);

    } catch (error) {

      throw new Error('Failded to create Topic')

    }
  }

  async findAll(): Promise<Topic[]> {
    const topics = await this.topicRepository.find()
    if (topics.length === 0) {
      throw new NotFoundException('No topics found');
    }

    return topics;
  }

  async findOne(id: number): Promise<Topic> {

    const topic = await this.topicRepository.findOne({
      where: { id },
    })
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    return topic;
  }

  async update( updateTopicInput: UpdateTopicInput) : Promise<Topic> {
    
        const {id, ...topicData } = updateTopicInput
    try {
      const topic = await this.findOne(id)
      if(topic){
        Object.assign(topic, topicData)
      } 
      return this.topicRepository.save(topic)
    } catch (error) {
      throw new Error(`Failed to update Topic: ${error.message}`)
    }
  
  }

  async remove(id: number): Promise<Topic> {
    const topic = await this.findOne(id); // ✅ await the async method

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    try {
      await this.topicRepository.softDelete(id);
      topic.deletedAt = new Date(); // optional: update for return

      return topic;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete Topic: ${error.message}`);
    }
  }
}
