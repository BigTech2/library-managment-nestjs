import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailCard } from './entities/detail-card.entity';
import { Card } from '../card/entities/card.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class DetailCardService {
  constructor(
    @InjectRepository(DetailCard)
    private detailCardRepository: Repository<DetailCard>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createDetailCard(card_id: number, book_id: number) {
    try {
      // Find card and book
      const card = await this.cardRepository.findOne({
        where: { id: card_id },
      });
      const book = await this.bookRepository.findOne({
        where: { id: book_id },
      });

      if (!card || !book) {
        return {
          message: 'Card or Book not found',
          data: null,
        };
      }

      // Get all DetailCards for this card
      const detailCards = await this.detailCardRepository.find({
        where: { card: { id: card_id } },
        relations: ['book'],
      });

      let detailCard;

      // Check if book already exists in any DetailCard
      const existingDetailCard = detailCards.find(
        (detail) => detail.book.id === book_id,
      );

      if (existingDetailCard) {
        // Update existing DetailCard
        existingDetailCard.quantity += 1;
        detailCard = await this.detailCardRepository.save(existingDetailCard);
      } else {
        // Create new DetailCard
        const newDetailCard = this.detailCardRepository.create({
          quantity: 1,
          book: book,
          card: card,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        detailCard = await this.detailCardRepository.save(newDetailCard);
      }

      // Calculate total quantity
      const totalQuantity =
        detailCards.reduce((sum, detail) => sum + detail.quantity, 0) +
        (existingDetailCard ? 0 : 1);

      // Update card quantity
      card.quantity = totalQuantity;
      await this.cardRepository.save(card);

      const card_result = await this.cardRepository.findOne({
        where: { id: card_id },
        relations: ['detailCards', 'detailCards.book'],
      });

      return {
        message: 'DetailCard created/updated successfully',
        data: card_result,
      };
    } catch (error) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: `Error: ${error.message}`,
        data: null,
      };
    }
  }

  async deleteDetailCard(detail_card_id: number) {
    try {
      // Find DetailCard with relations
      const detailCard = await this.detailCardRepository.findOne({
        where: { id: detail_card_id },
        relations: ['card', 'book'],
      });

      if (!detailCard) {
        return {
          message: 'DetailCard not found',
          data: null,
        };
      }

      // Store card_id before deletion
      const card_id = detailCard.card.id;

      // Delete DetailCard
      await this.detailCardRepository.remove(detailCard);

      // Get remaining DetailCards to recalculate total quantity
      const remainingDetailCards = await this.detailCardRepository.find({
        where: { card: { id: card_id } },
      });

      // Calculate new total quantity
      const newTotalQuantity = remainingDetailCards.reduce(
        (sum, detail) => sum + detail.quantity,
        0,
      );

      // Update card quantity
      const card = await this.cardRepository.findOne({
        where: { id: card_id },
      });
      if (card) {
        card.quantity = newTotalQuantity;
        await this.cardRepository.save(card);
      }

      // Get updated card with all relations
      const updatedCard = await this.cardRepository.findOne({
        where: { id: card_id },
        relations: ['detailCards', 'detailCards.book'],
      });

      return {
        message: 'DetailCard deleted successfully',
        data: {
          deletedDetailCard: detailCard,
          updatedCard: updatedCard,
        },
      };
    } catch (error) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: `Error: ${error.message}`,
        data: null,
      };
    }
  }
  // ...existing code...
}
