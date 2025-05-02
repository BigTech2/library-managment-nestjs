import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { OneToMany } from 'typeorm';

export enum RoleName {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleName,
    default: RoleName.USER,
  })
  name: RoleName;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
