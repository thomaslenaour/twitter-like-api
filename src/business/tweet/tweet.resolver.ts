import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './model/tweet.model';
import { TweetService } from './tweet.service';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Mutation(() => String)
  async createTweet(@Args('data') data: CreateTweetInput) {
    this.tweetService.createTweet(data);
    return 'Hello World';
  }
}
