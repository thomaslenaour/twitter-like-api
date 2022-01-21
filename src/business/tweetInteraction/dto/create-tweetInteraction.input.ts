import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BTweetInteractionType } from '../model/tweetInteraction.model';

@InputType()
export class CreateTweetInteractionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  tweetId: string;

  @Field(() => BTweetInteractionType)
  @IsEnum(BTweetInteractionType)
  @IsNotEmpty()
  type: BTweetInteractionType;
}
