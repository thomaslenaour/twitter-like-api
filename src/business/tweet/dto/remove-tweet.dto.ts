import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RemoveTweetInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  tweetId: string;
}
