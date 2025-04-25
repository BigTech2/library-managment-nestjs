import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { RefreshToken } from '../refresh-token/refresh-token.entity';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { Role, RoleName } from 'src/role/role.entity';

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
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    this.jwtSecret = process.env.SECRET_KEY || ''; // Lấy secret từ biến môi trường
    if (!this.jwtSecret) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }
  }

  async createUser(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const role = await this.roleRepository.findOne({
      where: { name: RoleName.USER },
    });

    if (!role) {
      throw new Error('Default role not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;

    user.password = hashedPassword;
    user.firstname = firstname;
    user.lastname = lastname;
    user.role = role;
    void this.userRepository.save(user);
    return {
      email: user.email,
    };
  }

  async generateToken(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }

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
    const length = 32; // Define the length variable
    const refreshToken = crypto
      .randomBytes(length)
      .toString('hex')
      .slice(0, length);
    expiresAt.setHours(expiresAt.getHours() + 24);

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
      relations: ['user'],
    });
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const now = new Date();
    if (refreshToken.expiresAt < now) {
      throw new Error('Refresh token expired');
    }
    console.log(refreshToken);

    const userId = refreshToken.user.id;
    console.log(userId);

    const user = await this.userRepository.findOne({
      where: { id: userId },
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
