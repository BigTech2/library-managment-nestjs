import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role, RoleName } from '../role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createUser(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ): Promise<User> {
    const role = await this.roleRepository.findOne({
      where: { name: RoleName.USER },
    });
    if (!role) {
      throw new Error('Role not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const passwordHash: string = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      firstname,
      lastname,
      email,
      password: passwordHash,
      role,
    });
    return this.userRepository.save(newUser);
  }
}
