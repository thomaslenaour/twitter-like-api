import { Module } from '@nestjs/common';
import { TweetRepository } from './tweet.repository';
import { TweetResolver } from './tweet.resolver';
import { TweetService } from './tweet.service';

@Module({
  providers: [TweetService, TweetRepository, TweetResolver],
})
export class TweetModule {}
