import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/business/user/models/user.model';

@ObjectType()
export class Follows {
  @Field(() => User)
  follower: User;

  @Field()
  followerId: string;

  @Field(() => User)
  following: User;

  @Field()
  followingId: string;

  @Field()
  isBlocked: boolean;
}
