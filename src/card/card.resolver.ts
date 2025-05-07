import { Resolver, Mutation, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CardPayload } from './dto/cardPayload';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { Card } from './entities/card.entity';
import { getCardOutput } from './dto/getCardOuput';

@Resolver()
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Mutation(() => CardPayload)
  @UseGuards(GqlAuthGuard)
  async createCard(
    @Context() context,
  ): Promise<{ message: string; data: any }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user_email = context.req.user.email;

    const result = await this.cardService.createCard(user_email);

    if (!result.data) {
      throw new Error(result.message);
    }

    return {
      message: result.message,
      data: result.data,
    };
  }

  @Query(() => getCardOutput)
  @UseGuards(GqlAuthGuard)
  async getCard(
    @Context() context,
  ): Promise<{ message: string; data: Card[] }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const user_email = context.req.user.email;

    const result = await this.cardService.getCard(user_email);

    if (!result.data) {
      throw new Error(result.message);
    }

    return {
      message: result.message,
      data: result.data,
    };
  }
}
