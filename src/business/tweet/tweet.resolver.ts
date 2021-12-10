import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './model/tweet.model';

@Resolver(() => Tweet)
export class TweetResolver {
  @Mutation(() => String)
  async createTweet(@Args('data') data: CreateTweetInput) {
    console.log(data);
    return 'Hello World';
  }
}
