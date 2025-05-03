import { Injectable } from '@nestjs/common';
import { CreateDetailCardInput } from './dto/create-detail-card.input';
import { UpdateDetailCardInput } from './dto/update-detail-card.input';

@Injectable()
export class DetailCardService {
  create(createDetailCardInput: CreateDetailCardInput) {
    return 'This action adds a new detailCard';
  }

  findAll() {
    return `This action returns all detailCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailCard`;
  }

  update(id: number, updateDetailCardInput: UpdateDetailCardInput) {
    return `This action updates a #${id} detailCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailCard`;
  }
}
