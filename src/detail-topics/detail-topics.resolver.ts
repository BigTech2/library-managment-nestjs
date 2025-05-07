import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailTopicsService } from './detail-topics.service';
import { DetailTopic } from './entities/detail-topic.entity';
import { CreateDetailTopicInput } from './dto/create-detail-topic.input';
import { UpdateDetailTopicInput } from './dto/update-detail-topic.input';

@Resolver(() => DetailTopic)
export class DetailTopicsResolver {
  constructor(private readonly detailTopicsService: DetailTopicsService) {}

  @Mutation(() => DetailTopic)
  createDetailTopic(
    @Args('createDetailTopicInput')
    createDetailTopicInput: CreateDetailTopicInput,
  ) {
    return this.detailTopicsService.create(createDetailTopicInput);
  }

  @Query(() => [DetailTopic], { name: 'detailTopics' })
  findAll() {
    return this.detailTopicsService.findAll();
  }

  @Query(() => DetailTopic, { name: 'detailTopic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.detailTopicsService.findOne(id);
  }

  @Mutation(() => DetailTopic)
  updateDetailTopic(
    @Args('updateDetailTopicInput')
    updateDetailTopicInput: UpdateDetailTopicInput,
  ) {
    return this.detailTopicsService.update(
      updateDetailTopicInput.id,
      updateDetailTopicInput,
    );
  }

  @Mutation(() => DetailTopic)
  removeDetailTopic(@Args('id', { type: () => Int }) id: number) {
    return this.detailTopicsService.remove(id);
  }
}
