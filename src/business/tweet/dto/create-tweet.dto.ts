import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TweetType } from '../model/tweet.model';

@InputType()
export class CreateTweetInput {
  @IsString()
  @MaxLength(280, {
    message: 'Content of tweet is too long',
  })
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
  type: TweetType;

  @IsOptional()
  @Field({ nullable: true })
  parentTweetId?: string;

  @IsOptional()
  @Field({ nullable: true })
  parentResponseId?: string;
}
