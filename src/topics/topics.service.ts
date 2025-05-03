import { Injectable } from '@nestjs/common';
import { CreateTopicInput } from './dto/create-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';

@Injectable()
export class TopicsService {
  create(createTopicInput: CreateTopicInput) {
    return 'This action adds a new topic';
  }

  findAll() {
    return `This action returns all topics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicInput: UpdateTopicInput) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
