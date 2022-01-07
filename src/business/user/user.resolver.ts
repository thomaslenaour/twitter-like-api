import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

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

  @Query(() => Boolean)
  async lol(@CurrentUser() user: User) {
    console.log('user', user);
    return true;
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
