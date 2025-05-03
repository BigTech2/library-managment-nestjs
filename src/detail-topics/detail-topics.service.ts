import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailTopicInput } from './dto/create-detail-topic.input';
import { UpdateDetailTopicInput } from './dto/update-detail-topic.input';
import { DetailTopic } from './entities/detail-topic.entity';

@Injectable()
export class DetailTopicsService {
  constructor(
    @InjectRepository(DetailTopic)
    private readonly detailTopicRepository: Repository<DetailTopic>,
  ) {}

  create(createDetailTopicInput: CreateDetailTopicInput) {
    return 'This action adds a new detailTopic';
  }

  findAll() {
    return `This action returns all detailTopics`;
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

  update(id: number, updateDetailTopicInput: UpdateDetailTopicInput) {
    return `This action updates a #${id} detailTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailTopic`;
  }
}
