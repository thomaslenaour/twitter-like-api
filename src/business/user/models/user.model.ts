import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { BaseModel } from 'src/technical/models/base-model';

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
export class User extends BaseModel {
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

  @Field(() => UserRole)
  role: UserRole;

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
