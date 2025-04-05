import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

interface CreateUserDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() body: CreateUserDto,
  ): Promise<{ message: string; data: { email: string; password: string } }> {
    const { email, password, firstname, lastname } = body;
    const result = await this.userService.createUser(
      email,
      password,
      firstname,
      lastname,
    );
    return {
      message: 'User created successfully',
      data: {
        email: result.email,
        password: result.password,
      },
    };
  }
}
