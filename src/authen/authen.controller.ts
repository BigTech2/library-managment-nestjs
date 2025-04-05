import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthenService } from './authen.service';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post('/generatetoken')
  async generatetoken(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const result = await this.authenService.generateToken(email, password);
    return {
      message: 'Login successful',
      data: result,
    };
  }

  @Get('/logout')
  async logout(@Headers('authorization') authorization: string) {
    if (!authorization.startsWith('Bearer ')) {
      return {
        message: 'Authorization header is missing',
      };
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return {
        message: 'Token is missing',
      };
    }
    const result = await this.authenService.logout(token);
    if (!result) {
      return {
        message: 'Logout failed',
      };
    }
    return {
      result,
    };
  }
}
