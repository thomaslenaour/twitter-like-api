import { Field, InputType } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsJWT()
  @Field()
  token: string;
}
