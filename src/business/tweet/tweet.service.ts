import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateTweetInput } from './dto/create-tweet.dto';
import { TweetType } from './model/tweet.model';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}

  getTweet(tweetId: string) {
    return this.tweetRepository.getTweet(tweetId);
  }

  async createTweet(createTweetInput: CreateTweetInput) {
    if (
      createTweetInput.type === TweetType.PARENT &&
      (createTweetInput.parentTweetId || createTweetInput.parentResponseId)
    ) {
      throw new BadRequestException(
        "A new tweet can't be a response to a tweet or a reponse to another response.",
      );
    }

    // A response tweet must have a parent Tweet Or a parent Response
    if (
      (createTweetInput.type === TweetType.RESPONSE &&
        !createTweetInput.parentTweetId &&
        !createTweetInput.parentResponseId) ||
      (createTweetInput.type === TweetType.RESPONSE &&
        createTweetInput.parentTweetId &&
        createTweetInput.parentResponseId)
    ) {
      throw new BadRequestException(
        'A response must have a parentTweetId or a parentResponseId.',
      );
    }

    try {
      return await this.tweetRepository.createTweet(createTweetInput);
    } catch (err) {
      throw err;
    }
  }

  removeTweet(tweetId: string) {
    return this.tweetRepository.removeTweet(tweetId);
  }
}
