import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateTweetInput } from './dto/create-tweet.input';
import { RemoveTweetInput } from './dto/remove-tweet.dto';
import { Tweet } from './model/tweet.model';
import { TweetService } from './tweet.service';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Mutation(() => Tweet)
  async createTweet(@Args('data') data: CreateTweetInput) {
    try {
      return await this.tweetService.createTweet(data);
    } catch (err) {
      throw new HttpException(
        err.message ? err.message : 'Error during request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation(() => Boolean)
  async removeTweet(@Args('data') data: RemoveTweetInput) {
    const removeTweetOutput = await this.tweetService.removeTweet(data);

    if (removeTweetOutput.errorMessage) {
      const message = removeTweetOutput.errorMessage;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
