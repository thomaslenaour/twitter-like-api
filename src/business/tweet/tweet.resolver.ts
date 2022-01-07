import { subject } from '@casl/ability';
import { UnauthorizedException } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import {
  AppAbility,
  CaslAbilityFactory,
} from 'src/technical/casl/casl-ability.factory';
import { TweetService } from './tweet.service';

import { Action } from 'src/technical/casl/types/casl.types';

import { CheckPolicies } from 'src/technical/casl/policy.decorator';
import { CurrentUser } from '../user/user.decorator';

import { CreateTweetInput } from './dto/create-tweet.dto';
import { Tweet } from './model/tweet.model';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(
    private readonly tweetService: TweetService,
    private caslAbilityFactory: CaslAbilityFactory,
    private userService: UserService,
  ) {}

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Tweet'))
  @Mutation(() => Tweet)
  async createTweet(@Args('data') data: CreateTweetInput) {
    try {
      return await this.tweetService.createTweet(data);
    } catch (err) {
      throw err;
    }
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Tweet'))
  @Mutation(() => Tweet)
  async removeTweet(@Args('tweetId') tweetId: string, @CurrentUser() user) {
    try {
      const ability = await this.caslAbilityFactory.createForUser(user.userId);
      const tweet = await this.tweetService.getTweet(tweetId);

      if (!ability.can(Action.Delete, subject('Tweet', tweet))) {
        throw new UnauthorizedException("You can't delete this tweet.");
      }

      return await this.tweetService.removeTweet(tweetId);
    } catch (err) {
      throw err;
    }
  }

  @Query(() => Tweet)
  async getTweet(@Args('tweetId') tweetId: string) {
    return await this.tweetService.getTweet(tweetId);
  }

  @ResolveField('author', () => User)
  async user(@Parent() tweet: Tweet) {
    const { authorId } = tweet;

    return await this.userService.getUser('id', authorId);
  }
}
