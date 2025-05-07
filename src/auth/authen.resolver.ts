import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthenService } from './authen.service';
import { AuthPayload } from './dto/auth-payload.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { role } from './role.decorator';

@Resolver()
export class AuthenResolver {
  constructor(private readonly authenService: AuthenService) {}

  @UseGuards(GqlAuthGuard, RoleGuard)
  @role('ADMIN')
  @Query(() => String)
  hello() {
    return 'Hello world';
  }

  @Mutation(() => AuthPayload)
  async generatetoken(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<{ message: string; data: any }> {
    const result = await this.authenService.generateToken(email, password);
    return {
      message: 'Login successful',
      data: result,
    };
  }

  @Mutation(() => AuthRegisterDto)
  async Regsiter(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstname') firstname: string,
    @Args('lastname') lastname: string,
  ): Promise<{ message: string; data: any }> {
    const result = await this.authenService.createUser(
      email,
      password,
      firstname,
      lastname,
    );
    return {
      message: 'Register successful',
      data: result,
    };
  }

  @Mutation(() => AuthPayload)
  async refreshAccessToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<{ message: string; data: any }> {
    const result = await this.authenService.refreshAccessToken(refreshToken);
    return {
      message: 'Refresh Token Successfully!',
      data: result,
    };
  }

  @Mutation(() => AuthPayload)
  async Logout(
    @Args('refreshToken') refreshToken: string,
  ): Promise<{ message: string; data: any }> {
    const result = await this.authenService.logout(refreshToken);
    return {
      message: 'Logout successfully!!!',
      data: result,
    };
  }
}
