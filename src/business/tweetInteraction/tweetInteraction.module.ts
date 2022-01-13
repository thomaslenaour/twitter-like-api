import { Module } from '@nestjs/common';

import { TweetInteractionRepository } from './tweetInteraction.repository';
import { TweetInteractionResolver } from './tweetInteraction.resolver';
import { TweetInteractionService } from './tweetInteraction.service';

@Module({
  providers: [
    TweetInteractionResolver,
    TweetInteractionService,
    TweetInteractionRepository,
  ],
})
export class TweetInteractionModule {}
