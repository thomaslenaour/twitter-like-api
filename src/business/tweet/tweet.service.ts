import { Injectable } from '@nestjs/common';
import { CreateTweetInput } from './dto/create-tweet.dto';
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
        `A new tweet can't be a response to a tweet or a reponse to another response.`,
      );
    }

    if (
      createTweetInput.type === TweetType.RESPONSE &&
      !createTweetInput.parentTweetId &&
      !createTweetInput.parentResponseId
    ) {
      throw new Error(
        `A response must have a parentTweetId or a parentResponseId.`,
      );
    }

    //Call repository
    return this.tweetRepository.createTweet(createTweetInput);
  }
}
