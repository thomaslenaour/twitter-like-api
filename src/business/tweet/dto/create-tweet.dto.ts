import { CreateTweetInput } from './create-tweet.input';

export class CreateTweetDto extends CreateTweetInput {
  authorId: string;
}
