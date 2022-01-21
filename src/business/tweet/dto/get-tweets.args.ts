import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetTweetsArgs {
  @Field({ nullable: true })
  filter?: string;

  @Field({ nullable: true })
  take?: number;

  @Field({ nullable: true })
  skip?: number;
}
