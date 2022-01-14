import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { User } from 'src/business/user/models/user.model';
import { BaseModel } from 'src/technical/models/base-model';

export enum BTweetType {
  PARENT = 'PARENT',
  RESPONSE = 'RESPONSE',
}

registerEnumType(BTweetType, {
  name: 'TweetType',
  description: 'The type of the tweet.',
  valuesMap: {
    PARENT: {
      description: 'A fresh post',
    },
    RESPONSE: {
      description: 'A response to a post or a response to a response',
    },
  },
});

@ObjectType()
export class Tweet extends BaseModel {
  @Field()
  content: string;

  @Field(() => User)
  author: User;

  @Field()
  authorId: string;

  @Field(() => BTweetType)
  type: BTweetType;

  @Field(() => Tweet, { nullable: true })
  parentTweet?: Tweet;

  @Field(() => [Tweet])
  responsesTweet: Array<Tweet>;

  @Field(() => Tweet, { nullable: true })
  parentResponseTweet?: Tweet;

  @Field(() => Tweet, { nullable: true })
  responseTweet?: Tweet;
}
