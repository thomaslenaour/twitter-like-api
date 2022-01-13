import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Tweet } from 'src/business/tweet/model/tweet.model';
import { User } from 'src/business/user/models/user.model';
import { BaseModelWithoutID } from 'src/technical/models/base-model';

export enum BTweetInteractionType {
  RETWEET = 'RETWEET',
  LIKE = 'LIKE',
}

registerEnumType(BTweetInteractionType, { name: 'BTweetInteractionType' });

@ObjectType()
export class TweetInteraction extends BaseModelWithoutID {
  @Field(() => BTweetInteractionType)
  type: BTweetInteractionType;

  @Field(() => Tweet)
  tweet: Tweet;

  @Field(() => User)
  user: User;
}
