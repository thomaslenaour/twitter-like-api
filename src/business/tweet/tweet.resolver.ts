import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateTweetInput } from './dto/create-tweet.dto';
import { RemoveTweetInput } from './dto/remove-tweet.dto';
import { Tweet } from './model/tweet.model';
import { TweetService } from './tweet.service';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Mutation(() => Tweet)
  async createTweet(@Args('data') data: CreateTweetInput) {
    const createTweetOutput = await this.tweetService.createTweet(data);

    if (createTweetOutput.errorMessage) {
      const message = createTweetOutput.errorMessage;

      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    return createTweetOutput.createdTweet;
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
