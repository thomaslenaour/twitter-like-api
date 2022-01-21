import { Module } from '@nestjs/common';

import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TweetRepository } from './tweet.repository';
import { TweetResolver } from './tweet.resolver';
import { TweetService } from './tweet.service';
import { TweetInteractionRepository } from '../tweetInteraction/tweetInteraction.repository';
import { TweetInteractionService } from '../tweetInteraction/tweetInteraction.service';

@Module({
  providers: [
    TweetService,
    TweetRepository,
    TweetResolver,
    UserService,
    UserRepository,
    TweetInteractionService,
    TweetInteractionRepository,
  ],
})
export class TweetModule {}
