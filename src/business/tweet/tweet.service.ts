import { Injectable } from '@nestjs/common';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}
}
