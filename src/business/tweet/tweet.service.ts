import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from '../user/user.service';

import { BTweetType } from './model/tweet.model';

import { CreateTweetDto } from './dto/create-tweet.dto';

import { TweetRepository } from './tweet.repository';
import { GetTweetsDto } from './dto/get-tweets.dto';
@Injectable()
export class TweetService {
  constructor(
    private readonly tweetRepository: TweetRepository,
    private readonly userService: UserService,
  ) {}

  async getTweet(tweetId: string) {
    const tweet = await this.tweetRepository.getTweet(tweetId);

    if (!tweet) {
      throw new NotFoundException(`No tweet found for this id : ${tweetId}`);
    }

    return tweet;
  }

  async getTweetsByUser(userId: string, args: GetTweetsDto) {
    return await this.tweetRepository.getParentTweets(userId, args);
  }

  async getResponseTweets(parentTweetId: string) {
    return await this.tweetRepository.getResponseTweets(parentTweetId);
  }

  async getResponseResponseTweets(parentResponseTweetId: string) {
    return await this.tweetRepository.getResponseResponseTweets(
      parentResponseTweetId,
    );
  }

  async createTweet(createTweetInput: CreateTweetDto) {
    if (
      createTweetInput.type === BTweetType.PARENT &&
      (createTweetInput.parentTweetId || createTweetInput.parentResponseTweetId)
    ) {
      throw new BadRequestException(
        "A new tweet can't be a response to a tweet or a reponse to another response.",
      );
    }

    // A response tweet must have a parent Tweet Or a parent Response
    if (createTweetInput.type === BTweetType.RESPONSE) {
      if (
        (!createTweetInput.parentTweetId &&
          !createTweetInput.parentResponseTweetId) ||
        (createTweetInput.parentTweetId &&
          createTweetInput.parentResponseTweetId)
      ) {
        throw new BadRequestException(
          'A response must have a parentTweetId or a parentResponseTweetId.',
        );
      }

      // TODO
      if (createTweetInput.parentResponseTweetId) {
        const { parentResponseTweetId } = await this.getTweet(
          createTweetInput.parentResponseTweetId,
        );

        if (parentResponseTweetId) {
          createTweetInput.parentResponseTweetId = parentResponseTweetId;
        }
      }
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
