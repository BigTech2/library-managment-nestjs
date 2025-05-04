import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicInput } from './dto/create-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {


  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository : Repository<Topic>  

  ){}


  create(createTopicInput: CreateTopicInput) {
    return 'This action adds a new topic';
  }

  findAll() {
    return `This action returns all topics`;
  }

 async findOne(id: number) : Promise<Topic> {

      const topic = await this.topicRepository.findOne({
        where: {id},
      })
      if(!topic){
        throw new NotFoundException(`Topic with ID ${id} not found`); 
      }
    
    return topic ;
  }

  update(id: number, updateTopicInput: UpdateTopicInput) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
