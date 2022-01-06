import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Tweet } from '@prisma/client';

export class RemoveTweetOutput {
  deletedTweet?: Tweet;
  errorMessage?: string;
}

@InputType()
export class RemoveTweetInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  tweetId: string;
}
