import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'; // Thêm các decorator từ GraphQL
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum RoleName {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Đăng ký enum cho GraphQL nếu cần thiết
// Điều này giúp GraphQL hiểu được enum này khi sử dụng trong @Field()
registerEnumType(RoleName, {
  name: 'RoleName',
  description: 'The role of the user',
});

@ObjectType() // Đánh dấu lớp này là một kiểu GraphQL
@Entity('roles')
export class Role {
  @Field(() => Int) // Đánh dấu id là một Field GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => RoleName) // Đánh dấu name là một Field GraphQL và kiểu trả về là RoleName enum
  @Column({
    type: 'enum',
    enum: RoleName,
    default: RoleName.USER,
  })
  name: RoleName;

  @Field(() => [User]) // Đánh dấu trường users là một Field GraphQL và kiểu trả về là một mảng User
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
