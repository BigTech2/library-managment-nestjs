import { CreateOverduaWarningInput } from './create-overdua-warning.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOverduaWarningInput extends PartialType(
  CreateOverduaWarningInput,
) {
  @Field(() => Int)
  id: number;
}
