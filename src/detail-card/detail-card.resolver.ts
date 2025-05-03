import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailCardService } from './detail-card.service';
import { DetailCard } from './entities/detail-card.entity';
import { CreateDetailCardInput } from './dto/create-detail-card.input';
import { UpdateDetailCardInput } from './dto/update-detail-card.input';

@Resolver(() => DetailCard)
export class DetailCardResolver {
  constructor(private readonly detailCardService: DetailCardService) {}

  @Mutation(() => DetailCard)
  createDetailCard(@Args('createDetailCardInput') createDetailCardInput: CreateDetailCardInput) {
    return this.detailCardService.create(createDetailCardInput);
  }

  @Query(() => [DetailCard], { name: 'detailCard' })
  findAll() {
    return this.detailCardService.findAll();
  }

  @Query(() => DetailCard, { name: 'detailCard' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.detailCardService.findOne(id);
  }

  @Mutation(() => DetailCard)
  updateDetailCard(@Args('updateDetailCardInput') updateDetailCardInput: UpdateDetailCardInput) {
    return this.detailCardService.update(updateDetailCardInput.id, updateDetailCardInput);
  }

  @Mutation(() => DetailCard)
  removeDetailCard(@Args('id', { type: () => Int }) id: number) {
    return this.detailCardService.remove(id);
  }
}
