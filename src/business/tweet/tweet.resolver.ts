import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/technical/auth/guards/jwt-auth.guard';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './model/tweet.model';
import { TweetService } from './tweet.service';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtAuthGuard)
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
}
