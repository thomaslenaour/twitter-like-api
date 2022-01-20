import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { User } from 'src/business/user/models/user.model';

@ObjectType()
export class TokenWithUser {
  @Field({ description: 'Identifies the JWT access token.' })
  accessToken: string;

  @Field({ nullable: true, description: 'Identifies the JWT refresh token.' })
  refreshToken: string;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class Token extends OmitType(TokenWithUser, [
  'user',
  'userId',
] as const) {}
