import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Token } from './models/token.model';

import { AuthService } from './auth.service';

import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

import { Public } from './decorators/public.decorator';
import { UserIp } from './decorators/ip.decorator';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => Token)
  async signup(@Args('data') data: SignupInput, @UserIp() ip: string) {
    try {
      return await this.authService.createUser(data, ip);
    } catch (err) {
      throw err;
    }
  }

  @Public()
  @Mutation(() => Token)
  async login(@Args('data') data: LoginInput, @UserIp() ip: string) {
    try {
      return await this.authService.login(data, ip);
    } catch (err) {
      throw err;
    }
  }

  @Public()
  @Mutation(() => Token)
  async refreshToken(@Args('token') token: string, @UserIp() ip: string) {
    try {
      return await this.authService.refreshToken(token, ip);
    } catch (err) {
      throw err;
    }
  }
}
