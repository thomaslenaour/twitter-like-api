import { Injectable } from '@nestjs/common';
import { CreateTweetInput } from './dto/create-tweet.input';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}

  createTweet(createTweetInput: CreateTweetInput) {
    //Business logic
    //Call repository
    return this.tweetRepository.createUser(createTweetInput);
  }
}
