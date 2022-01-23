import { subject } from '@casl/ability';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
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
import { GqlAuthGuard } from 'src/technical/auth/guards/gql-auth.guard';
import { PoliciesGuard } from 'src/technical/casl/policies.guard';

import { Action } from 'src/technical/casl/types/casl.types';

import { CheckPolicies } from 'src/technical/casl/policy.decorator';
import { CurrentUser } from '../user/user.decorator';
import { JwtDecodedUser } from 'src/technical/auth/types/jwt.interface';

import { User } from '../user/models/user.model';
import { Tweet } from './model/tweet.model';

import { CreateTweetInput } from './dto/create-tweet.input';

import { TweetService } from './tweet.service';
import { UserService } from '../user/user.service';
import { GetTweetsArgs as GetTweetsArgs } from './dto/get-tweets.args';
import { TweetInteraction } from '../tweetInteraction/model/tweetInteraction.model';
import { TweetInteractionService } from '../tweetInteraction/tweetInteraction.service';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(
    private tweetService: TweetService,
    private caslAbilityFactory: CaslAbilityFactory,
    private userService: UserService,
    private tweetInteractionService: TweetInteractionService,
  ) {}

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Tweet'))
  @Mutation(() => Tweet)
  async createTweet(
    @Args('data') data: CreateTweetInput,
    @CurrentUser() user: JwtDecodedUser,
  ) {
    try {
      return await this.tweetService.createTweet({
        ...data,
        authorId: user.userId,
      });
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Tweet'))
  @Mutation(() => Tweet)
  async removeTweet(
    @Args('tweetId') tweetId: string,
    @CurrentUser() user: JwtDecodedUser,
  ) {
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

  @UseGuards(GqlAuthGuard)
  @Query(() => Tweet)
  async getTweet(@Args('tweetId') tweetId: string) {
    return await this.tweetService.getTweet(tweetId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Tweet])
  async getTweets(
    @Args() args: GetTweetsArgs,
    @CurrentUser() user: JwtDecodedUser,
  ) {
    return await this.tweetService.getTweetsByUser(user.userId, args);
  }

  @ResolveField('author', () => User)
  async user(@Parent() tweet: Tweet) {
    return await this.userService.getUser('id', tweet.authorId);
  }

  @ResolveField('parentTweet', () => Tweet, { nullable: true })
  async parentTweet(@Parent() tweet: Tweet) {
    if (!tweet.parentTweetId) return null;

    return await this.tweetService.getTweet(tweet.parentTweetId);
  }

  @ResolveField('responseTweets', () => [Tweet])
  async responseTweets(@Parent() tweet: Tweet) {
    return await this.tweetService.getResponseTweets(tweet.id);
  }

  @ResolveField('parentResponseTweet', () => Tweet, { nullable: true })
  async parentResponseTweet(@Parent() tweet: Tweet) {
    if (!tweet.parentResponseTweetId) return null;

    return await this.tweetService.getTweet(tweet.parentResponseTweetId);
  }

  @ResolveField('responseResponseTweets', () => [Tweet])
  async responseResponseTweets(@Parent() tweet: Tweet) {
    return await this.tweetService.getResponseResponseTweets(tweet.id);
  }

  @ResolveField('interactions', () => [TweetInteraction])
  async interactions(@Parent() tweet: Tweet) {
    return await this.tweetInteractionService.getTweetInteractions(tweet.id);
  }
}
