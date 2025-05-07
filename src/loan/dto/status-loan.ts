import { registerEnumType } from '@nestjs/graphql';

export enum StatusLoanBookEnum {
  LOANING = 'loaning',
  RETURNED = 'returned',
  DELAY = 'delay',
}

registerEnumType(StatusLoanBookEnum, {
  name: 'StatusLoanBookEnum', // Tên này phải trùng với tên trong @Field(() => ...)
  description: 'The status of a loaned book',
});
