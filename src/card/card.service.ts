import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ...existing code...

  async createCard(user_email: string) {
    try {
      // Find user
      const user = await this.userRepository.findOne({
        where: { email: user_email },
      });
      if (!user) {
        return {
          message: 'Error: User not found',
          data: null,
        };
      }

      // Get all cards of the user
      const userCards = await this.cardRepository.find({
        where: { user: { id: user.id } },
        relations: ['detailCards', 'detailCards.book'],
        order: { createdAt: 'DESC' },
      });

      // If user has no cards, create new one
      if (userCards.length === 0) {
        const newCard = this.cardRepository.create({
          quantity: 0,
          isLoaned: false,
          user: user,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        const savedCard = await this.cardRepository.save(newCard);
        return {
          message: 'Card created successfully',
          data: savedCard,
        };
      }

      // Check the latest card
      const latestCard = userCards[0];
      if (!latestCard.isLoaned) {
        return {
          message: 'You already have an active card',
          data: latestCard,
        };
      }

      // Create new card if latest is loaned
      const newCard = this.cardRepository.create({
        quantity: 0,
        isLoaned: false,
        user: user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const savedCard = await this.cardRepository.save(newCard);
      return {
        message: 'New card created successfully',
        data: savedCard,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        message: `Error`,
        data: null,
      };
    }
  }

  async getCard(user_email: string) {
    try {
      // Find user
      const user = await this.userRepository.findOne({
        where: { email: user_email },
      });

      if (!user) {
        return {
          message: 'Error: User not found',
          data: null,
        };
      }

      // Get all active cards (isLoaned = false) of the user
      const activeCards = await this.cardRepository.find({
        where: {
          user: { id: user.id },
          isLoaned: false,
        },
        relations: ['user'],
      });

      return {
        message: 'Cards retrieved successfully',
        data: activeCards,
      };
    } catch (error) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: `Error: ${error.message}`,
        data: null,
      };
    }
  }
}
