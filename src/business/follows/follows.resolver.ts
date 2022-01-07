import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../user/models/user.model';

import { CurrentUser } from '../user/user.decorator';
import { UserService } from '../user/user.service';

import { FollowsService } from './follows.service';

import { Follows } from './models/follows.model';

@Resolver(() => Follows)
export class FollowsResolver {
  constructor(
    private followsService: FollowsService,
    private userService: UserService,
  ) {}

  @Mutation(() => Follows)
  async follow(@Args('userId') userId: string, @CurrentUser() user) {
    try {
      return await this.followsService.follow(userId, user.userId);
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Follows)
  async unfollow(@Args('userId') userId: string, @CurrentUser() user) {
    try {
      return await this.followsService.unfollow(userId, user.userId);
    } catch (err) {
      throw err;
    }
  }

  @ResolveField('follower', () => User)
  async follower(@Parent() follows: Follows) {
    return await this.userService.getUser('id', follows.followingId);
  }

  @ResolveField('following', () => User)
  async following(@Parent() follows: Follows) {
    return await this.userService.getUser('id', follows.followerId);
  }
}
