import { Injectable } from '@nestjs/common';
import { Loan } from './entities/loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { StatusLoanBookEnum } from './dto/status-loan';
import { Card } from 'src/card/entities/card.entity';
import { LoanDetail } from 'src/loan-detail/entities/loan-detail.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(LoanDetail)
    private readonly loanDetailRepository: Repository<LoanDetail>,
  ) {}
  async getAllLoan() {
    const loanResults = await this.loanRepository.find({
      relations: ['loanDetails', 'loanDetails.book'],
    });
    if (loanResults) {
      return {
        Message: 'Oke',
        Data: loanResults,
      };
    }
    return {
      Message: 'Error',
      Data: 'Not found loan or error connet server',
    };
  }

  async getAllLoanWithUserID(user_email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: user_email,
      },
    });

    if (!user) {
      return {
        Message: 'Error',
        Data: 'You don not permission',
      };
    }

    const results = await this.loanRepository.find({
      where: {
        user_id: user,
      },
      relations: ['loanDetails', 'loanDetails.book'],
    });

    if (!results) {
      return {
        Message: 'Error',
        Data: 'Not found Loans',
      };
    }

    return {
      Message: 'Oke',
      Data: results,
    };
  }

  async getLoanOnlyForUser(user_email: string, loan_id: number) {
    const onlyLoan = await this.loanRepository.findOne({
      where: {
        id: loan_id,
      },
      relations: ['loanDetails', 'loanDetails.book'],
    });

    if (onlyLoan?.user_id.email !== user_email) {
      return {
        Message: 'Error',
        Data: 'You do not have permision',
      };
    }

    return {
      Message: 'Oke',
      Data: onlyLoan,
    };
  }

  async uploadLoanStatus(status: number, loan_id: number) {
    let status_string: StatusLoanBookEnum;
    switch (status) {
      case 0:
        status_string = StatusLoanBookEnum.RETURNED;
        break;
      default:
        status_string = StatusLoanBookEnum.DELAY;
        break;
    }
    const loanRecord = await this.loanRepository.findOne({
      where: {
        id: loan_id,
      },
      relations: ['loanDetails', 'loanDetails.book'],
    });

    if (!loanRecord) {
      return {
        Messsage: 'Error',
        Data: 'null',
      };
    }
    loanRecord.status = status_string;

    await this.loanRepository.save(loanRecord);

    return {
      Message: 'Oke',
      Status: loanRecord,
    };
  }

  async createLoan(user_email: string, card_id: number, returnDate: Date) {
    try {
      // Get card with details and books
      const card = await this.cardRepository.findOne({
        where: { id: card_id },
        relations: ['detailCards', 'detailCards.book', 'user'],
      });

      if (!card) {
        return {
          message: 'Card not found',
          data: null,
        };
      }

      // Get user
      const user = await this.userRepository.findOne({
        where: { email: user_email },
      });

      if (!user) {
        return {
          message: 'User not found',
          data: null,
        };
      }

      // Check if card belongs to user
      if (card.user.id !== user.id) {
        return {
          message: 'This card does not belong to you',
          data: null,
        };
      }

      // Create new loan
      const newLoan = this.loanRepository.create({
        brrowDate: new Date(),
        returnDate: returnDate,
        status: StatusLoanBookEnum.LOANING,
        quantity: card.quantity,
        user_id: user,
      });

      // Save loan
      const savedLoan = await this.loanRepository.save(newLoan);

      // Create loan details for each detail card
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const loanDetails = await Promise.all(
        card.detailCards.map(async (detailCard) => {
          const newLoanDetail = this.loanDetailRepository.create({
            book: detailCard.book,
            loan: savedLoan,
          });
          return await this.loanDetailRepository.save(newLoanDetail);
        }),
      );

      card.isLoaned = true;
      await this.cardRepository.save(card);

      // Get complete loan with details
      const completeLoan = await this.loanRepository.findOne({
        where: { id: savedLoan.id },
        relations: ['loanDetails', 'loanDetails.book'],
      });

      return {
        message: 'Loan created successfully',
        data: completeLoan,
      };
    } catch (error) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: `Error creating loan: ${error.message}`,
        data: null,
      };
    }
  }
}
