import { Module } from '@nestjs/common';

import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TweetRepository } from './tweet.repository';
import { TweetResolver } from './tweet.resolver';
import { TweetService } from './tweet.service';

@Module({
  providers: [
    TweetService,
    TweetRepository,
    TweetResolver,
    UserService,
    UserRepository,
  ],
})
export class TweetModule {}
