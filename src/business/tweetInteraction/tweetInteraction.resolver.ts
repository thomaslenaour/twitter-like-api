import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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

@Resolver(TweetInteraction)
export class TweetInteractionResolver {
  constructor(private tweetInteractionService: TweetInteractionService) {}

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

      if (existingTweetInteraction) {
        return await this.tweetInteractionService.deleteTweetInteraction(
          existingTweetInteraction.id,
        );
      }

      return await this.tweetInteractionService.createTweetInteraction(
        tweetInteractionData,
      );
    } catch (err) {
      throw err;
    }
  }
}
