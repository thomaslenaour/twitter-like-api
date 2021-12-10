import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Tweet, TweetType } from '../model/tweet.model';

@InputType()
export class CreateTweetInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  content: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  authorId: string;

  @IsNotEmpty()
  @IsEnum(TweetType)
  @Field(() => TweetType)
  tweetType: TweetType;

  @IsOptional()
  @Field({ nullable: true })
  parentTweetId?: string;

  @IsOptional()
  @Field({ nullable: true })
  parentResponseId?: string;
}
