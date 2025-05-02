import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role, RoleName } from '../role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

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
