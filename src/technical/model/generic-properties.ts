import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenericProperties {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
