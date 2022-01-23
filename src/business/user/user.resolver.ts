import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Public } from 'src/technical/auth/decorators/public.decorator';
import { JwtDecodedUser } from 'src/technical/auth/types/jwt.interface';
import { CenterOfInterest } from '../centerOfInterest/model/centerOfInterest.model';
import { FollowsService } from '../follows/follows.service';
import { Follows } from '../follows/models/follows.model';

import { UpdateUserInput } from './dto/update-user.input';

import { User } from './models/user.model';
import { CurrentUser } from './user.decorator';

import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private followsService: FollowsService,
  ) {}

  @Public()
  @Query(() => User)
  async user(@Args('userId') userId: string) {
    try {
      return await this.userService.getUser('id', userId);
    } catch (err) {
      throw err;
    }
  }

  @Query(() => [User])
  async searchUser(@Args('searchValue') searchValue: string) {
    return await this.userService.searchUser(searchValue);
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

  @Query(() => [User])
  async getCompatibleUsersList(@CurrentUser() user: JwtDecodedUser) {
    return await this.userService.getCompatibleUsersList(user);
  }

  @ResolveField('followers', () => [Follows])
  async followers(@Parent() user: User) {
    return await this.followsService.getFollowers(user.id);
  }

  @ResolveField('following', () => [Follows])
  async following(@Parent() user: User) {
    return await this.followsService.getFollowing(user.id);
  }

  @ResolveField('centersOfInterest', () => [CenterOfInterest])
  async centersOfInterest(@Parent() user: User) {
    const { centerOfInterests } =
      await this.userService.getUserCentersOfInterest(user.id);
    return centerOfInterests;
  }
}
