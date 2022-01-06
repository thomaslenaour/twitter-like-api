import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Token } from './models/token.model';

import { AuthService } from './auth.service';

import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Public } from './public.decorator';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => Token)
  async signup(@Args('data') data: SignupInput) {
    try {
      return await this.authService.createUser(data, '127.0.0.1');
    } catch (err) {
      throw new HttpException(
        err?.message || 'Cannot create user for the moment.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Mutation(() => Token)
  async login(@Args('data') data: LoginInput) {
    return await this.authService.login(
      data.emailOrPseudo,
      data.password,
      '127.0.0.1',
    );
  }

  @Public()
  @Mutation(() => Token)
  async refreshToken(@Args('token') token: string) {
    return this.authService.refreshToken(token, '127.0.0.1');
  }
}
