import { Injectable } from '@nestjs/common';
import { CreateOverduaWarningInput } from './dto/create-overdua-warning.input';
import { UpdateOverduaWarningInput } from './dto/update-overdua-warning.input';

@Injectable()
export class OverduaWarningService {
  create(createOverduaWarningInput: CreateOverduaWarningInput) {
    return 'This action adds a new overduaWarning';
  }

  findAll() {
    return `This action returns all overduaWarning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} overduaWarning`;
  }

  update(id: number, updateOverduaWarningInput: UpdateOverduaWarningInput) {
    return `This action updates a #${id} overduaWarning`;
  }

  remove(id: number) {
    return `This action removes a #${id} overduaWarning`;
  }
}
