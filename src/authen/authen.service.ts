import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { RefreshToken } from '../refresh-token/refresh-token.entity';
import * as dotenv from 'dotenv';
import { Role } from 'src/role/role.entity';

dotenv.config();
@Injectable()
export class AuthenService {
  private jwtSecret: string;
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(RefreshToken)
    private readonly roleRepository: Repository<Role>,
  ) {
    this.jwtSecret = process.env.SECRET_KEY || ''; // Lấy secret từ biến môi trường
    if (!this.jwtSecret) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }
  }

  async generateToken(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const now = new Date();
    const userRefreshTokens = await this.refreshTokenRepository.find({
      where: { user: user },
    });

    if (userRefreshTokens.length > 0) {
      for (const token of userRefreshTokens) {
        if (token.expiresAt < now) {
          await this.refreshTokenRepository.remove(token);
        }
      }
    }

    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + 1 * 24 * 60 * 60 * 1000);
    const refreshToken = this.jwtService.sign(
      {},
      { secret: this.jwtSecret, expiresIn: '7h' },
    );

    await this.refreshTokenRepository.save({
      token: refreshToken,
      expiresAt: expiresAt,
      user: user,
    });

    const accessToken = this.jwtService.sign(
      {
        fullname: `${user.lastname} ${user.firstname}`,
        email: user.email,
        role: user.role.name,
      },
      { secret: this.jwtSecret, expiresIn: '1h' },
    );

    return {
      refreshToken,
      accessToken,
      fullname: `${user.lastname} ${user.firstname}`,
      email: user.email,
      role: user.role.name,
    };
  }

  async logout(refreshToken: string) {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    });
    if (!token) {
      throw new Error('Invalid refresh token');
    }

    await this.refreshTokenRepository.remove(token);
    return { message: 'Logout successful' };
  }

  async refreshAccessToken(token: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: token },
    });
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const now = new Date();
    if (refreshToken.expiresAt < now) {
      throw new Error('Refresh token expired');
    }

    const user = await this.userRepository.findOne({
      where: { id: refreshToken.user.id },
      relations: ['role'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = this.jwtService.sign(
      {
        fullname: `${user.lastname} ${user.firstname}`,
        email: user.email,
        role: user.role.name,
      },
      { secret: this.jwtSecret, expiresIn: '1h' },
    );

    return {
      accessToken,
      fullname: `${user.lastname} ${user.firstname}`,
      email: user.email,
      role: user.role.name,
    };
  }
}
