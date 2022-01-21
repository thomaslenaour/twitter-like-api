import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/technical/auth/guards/gql-auth.guard';
import { AppAbility } from 'src/technical/casl/casl-ability.factory';
import { CheckPolicies } from 'src/technical/casl/policy.decorator';
import { PoliciesGuard } from 'src/technical/casl/policies.guard';
import { Action } from 'src/technical/casl/types/casl.types';
import { CurrentUser } from '../user/user.decorator';
import { JwtDecodedUser } from 'src/technical/auth/types/jwt.interface';

import { TweetInteraction } from './model/tweetInteraction.model';

import { TweetInteractionService } from './tweetInteraction.service';

import { CreateTweetInteractionInput } from './dto/create-tweetInteraction.input';

import { Tweet } from '../tweet/model/tweet.model';
import { User } from '../user/models/user.model';

import { UserService } from '../user/user.service';
import { TweetService } from '../tweet/tweet.service';

@Resolver(TweetInteraction)
export class TweetInteractionResolver {
  constructor(
    private tweetInteractionService: TweetInteractionService,
    private tweetService: TweetService,
    private userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) => ability.can(Action.Create, 'TweetInteraction'),
    (ability: AppAbility) => ability.can(Action.Delete, 'TweetInteraction'),
  )
  @Mutation(() => TweetInteraction)
  async interact(
    @Args('data') data: CreateTweetInteractionInput,
    @CurrentUser() user: JwtDecodedUser,
  ) {
    const tweetInteractionData = {
      ...data,
      userId: user.userId,
    };

    try {
      const existingTweetInteraction =
        await this.tweetInteractionService.getUniqueTweetInteraction(
          tweetInteractionData,
        );

      return existingTweetInteraction
        ? await this.tweetInteractionService.deleteTweetInteraction(
            tweetInteractionData,
          )
        : await this.tweetInteractionService.createTweetInteraction(
            tweetInteractionData,
          );
    } catch (err) {
      throw err;
    }
  }

  @ResolveField('tweet', () => Tweet)
  tweet(@Parent() tweetInteraction: TweetInteraction) {
    return this.tweetService.getTweet(tweetInteraction.tweetId);
  }

  @ResolveField('user', () => User)
  user(@Parent() tweetInteraction: TweetInteraction) {
    return this.userService.getUser('id', tweetInteraction.userId);
  }
}
