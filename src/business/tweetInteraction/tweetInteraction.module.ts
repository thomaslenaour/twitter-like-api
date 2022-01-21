import { Module } from '@nestjs/common';

import { TweetRepository } from '../tweet/tweet.repository';
import { TweetService } from '../tweet/tweet.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TweetInteractionRepository } from './tweetInteraction.repository';
import { TweetInteractionResolver } from './tweetInteraction.resolver';
import { TweetInteractionService } from './tweetInteraction.service';

@Module({
  providers: [
    TweetInteractionResolver,
    TweetInteractionService,
    TweetInteractionRepository,
    TweetService,
    TweetRepository,
    UserService,
    UserRepository,
  ],
})
export class TweetInteractionModule {}
