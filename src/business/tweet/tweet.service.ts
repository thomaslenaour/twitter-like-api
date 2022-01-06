import { Injectable } from '@nestjs/common';
import { CreateTweetInput, CreateTweetOutput } from './dto/create-tweet.dto';
import { RemoveTweetInput, RemoveTweetOutput } from './dto/remove-tweet.dto';
import { TweetType } from './model/tweet.model';
import { TweetRepository } from './tweet.repository';

@Injectable()
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}

  async createTweet(
    createTweetInput: CreateTweetInput,
  ): Promise<CreateTweetOutput> {
    if (
      createTweetInput.type === TweetType.PARENT &&
      (createTweetInput.parentTweetId || createTweetInput.parentResponseId)
    ) {
      return {
        errorMessage: `A new tweet can't be a response to a tweet or a reponse to another response.`,
      };
    }

    if (
      createTweetInput.type === TweetType.RESPONSE &&
      !createTweetInput.parentTweetId &&
      !createTweetInput.parentResponseId
    ) {
      return {
        errorMessage: `A response must have a parentTweetId or a parentResponseId.`,
      };
    }

    //Call repository
    const createdTweet = await this.tweetRepository.createTweet(
      createTweetInput,
    );

    return { createdTweet };
  }

  removeTweet(removeTweetInput: RemoveTweetInput): Promise<RemoveTweetOutput> {
    return this.tweetRepository.removeTweet(removeTweetInput);
  }
}
