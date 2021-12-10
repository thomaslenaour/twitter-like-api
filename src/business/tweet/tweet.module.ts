import { Module } from '@nestjs/common';
import { TweetRepository } from './tweet.repository';
import { TweetService } from './tweet.service';

@Module({
  providers: [TweetService, TweetRepository],
})
export class TweetModule {}
