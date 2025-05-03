import { Injectable } from '@nestjs/common';
import { CreateDetailTopicInput } from './dto/create-detail-topic.input';
import { UpdateDetailTopicInput } from './dto/update-detail-topic.input';

@Injectable()
export class DetailTopicsService {
  create(createDetailTopicInput: CreateDetailTopicInput) {
    return 'This action adds a new detailTopic';
  }

  findAll() {
    return `This action returns all detailTopics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailTopic`;
  }

  update(id: number, updateDetailTopicInput: UpdateDetailTopicInput) {
    return `This action updates a #${id} detailTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailTopic`;
  }
}
