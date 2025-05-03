import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OverduaWarningService } from './overdua-warning.service';
import { OverduaWarning } from './entities/overdua-warning.entity';
import { CreateOverduaWarningInput } from './dto/create-overdua-warning.input';
import { UpdateOverduaWarningInput } from './dto/update-overdua-warning.input';

@Resolver(() => OverduaWarning)
export class OverduaWarningResolver {
  constructor(private readonly overduaWarningService: OverduaWarningService) {}

  @Mutation(() => OverduaWarning)
  createOverduaWarning(@Args('createOverduaWarningInput') createOverduaWarningInput: CreateOverduaWarningInput) {
    return this.overduaWarningService.create(createOverduaWarningInput);
  }

  @Query(() => [OverduaWarning], { name: 'overduaWarning' })
  findAll() {
    return this.overduaWarningService.findAll();
  }

  @Query(() => OverduaWarning, { name: 'overduaWarning' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.overduaWarningService.findOne(id);
  }

  @Mutation(() => OverduaWarning)
  updateOverduaWarning(@Args('updateOverduaWarningInput') updateOverduaWarningInput: UpdateOverduaWarningInput) {
    return this.overduaWarningService.update(updateOverduaWarningInput.id, updateOverduaWarningInput);
  }

  @Mutation(() => OverduaWarning)
  removeOverduaWarning(@Args('id', { type: () => Int }) id: number) {
    return this.overduaWarningService.remove(id);
  }
}
