import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';

import { User } from './models/user.model';

import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('userId') userId: string) {
    const user = await this.userService.getUser('id', userId);

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
      await this.userService.createUser(data);
    } catch (err) {
      throw new HttpException(
        err?.message || 'Unknow error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
