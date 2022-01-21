import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Token, TokenWithUser } from './models/token.model';

import { AuthService } from './auth.service';

import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

import { Public } from './decorators/public.decorator';
import { UserIp } from './decorators/ip.decorator';
import { User } from 'src/business/user/models/user.model';
import { UserService } from 'src/business/user/user.service';

@Resolver(() => TokenWithUser)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Mutation(() => TokenWithUser)
  async signup(@Args('data') data: SignupInput, @UserIp() ip: string) {
    try {
      return await this.authService.createUser(data, ip);
    } catch (err) {
      throw err;
    }
  }

  @Public()
  @Mutation(() => TokenWithUser)
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

  @ResolveField('user', () => User)
  async user(@Parent() token: TokenWithUser) {
    return await this.userService.getUser('id', token.userId);
  }
}
