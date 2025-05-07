import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailCardService } from './detail-card.service';
import { DetailCard } from './entities/detail-card.entity';
import { DetailCardPayload } from './dto/detail-card-payload';

@Resolver(() => DetailCard)
export class DetailCardResolver {
  constructor(private readonly detailCardService: DetailCardService) {}

  @Mutation(() => DetailCardPayload)
  async createDetailCard(
    @Args('card_id', { type: () => Int }) card_id: number,
    @Args('book_id', { type: () => Int }) book_id: number,
  ) {
    const result = await this.detailCardService.createDetailCard(
      card_id,
      book_id,
    );

    if (!result.data) {
      throw new Error(result.message);
    }

    return {
      message: result.message,
      data: result.data,
    };
  }

  @Mutation(() => DetailCardPayload)
  async deleteDetailCard(
    @Args('detail_card_id', { type: () => Int }) detail_card_id: number,
  ) {
    const result =
      await this.detailCardService.deleteDetailCard(detail_card_id);

    if (!result.data) {
      throw new Error(result.message);
    }

    return {
      message: result.message,
      data: result.data,
    };
  }
}
