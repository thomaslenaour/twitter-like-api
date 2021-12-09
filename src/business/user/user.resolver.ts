import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';

import { User } from './model/user.model';

import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('userId') userId: string) {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new HttpException(
        'No user found with the provided ID.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    try {
      return await this.userService.createUser(data);
    } catch (err) {
      throw new HttpException(
        err?.message || 'Unknow error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
