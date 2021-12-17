import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field({ description: 'Identifies the JWT access token.' })
  accessToken: string;

  @Field({ nullable: true, description: 'Identifies the JWT refresh token.' })
  refreshToken: string;
}
