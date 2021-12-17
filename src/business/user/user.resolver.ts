import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/technical/auth/guards/gql-auth.guard';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { User } from './models/user.model';
import { CurrentUser } from './user.decorator';

import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  // @Query(() => User)
  // async user(@Args('userId') userId: string) {
  //   const user = await this.userService.getUser('id', userId);

  //   if (!user) {
  //     throw new HttpException(
  //       'No user found with the provided ID.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   return user;
  // }

  @UseGuards(GqlAuthGuard)
  @Query(() => Boolean)
  async lol(@CurrentUser() user: User) {
    return true;
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

  @Mutation(() => User)
  async updateUser(@Args('data') data: UpdateUserInput) {
    try {
      return await this.userService.updateUser(data);
    } catch (err) {
      throw new HttpException(
        err?.message || 'Unknow error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
