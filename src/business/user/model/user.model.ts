import { Field, ObjectType } from '@nestjs/graphql';

import { GenericProperties } from 'src/technical/model/generic-properties';

@ObjectType()
export class User extends GenericProperties {
  @Field()
  name: string;

  @Field()
  pseudo: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  birthDate: Date;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })
  bannerUrl?: string;

  @Field({ nullable: true })
  websiteUrl?: string;

  @Field({ nullable: true })
  location?: string;
}
