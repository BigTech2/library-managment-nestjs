import { Injectable } from '@nestjs/common';
import { CreateLoanDetailInput } from './dto/create-loan-detail.input';
import { UpdateLoanDetailInput } from './dto/update-loan-detail.input';

@Injectable()
export class LoanDetailService {
  create(createLoanDetailInput: CreateLoanDetailInput) {
    return 'This action adds a new loanDetail';
  }

  findAll() {
    return `This action returns all loanDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loanDetail`;
  }

  update(id: number, updateLoanDetailInput: UpdateLoanDetailInput) {
    return `This action updates a #${id} loanDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} loanDetail`;
  }
}
