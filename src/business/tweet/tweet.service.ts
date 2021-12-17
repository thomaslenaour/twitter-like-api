import { Injectable } from '@nestjs/common';
import { CreateTweetInput } from './dto/create-tweet.input';
import { TweetType } from './model/tweet.model';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}

  createTweet(createTweetInput: CreateTweetInput) {
    //Business logic
    if (
      createTweetInput.type === TweetType.PARENT &&
      (createTweetInput.parentTweetId || createTweetInput.parentResponseId)
    ) {
      throw new Error(
        `A new tweet can't be a response to a tweet or a reponse to another response`,
      );
    }

    //Call repository
    return this.tweetRepository.createUser(createTweetInput);
  }
}
