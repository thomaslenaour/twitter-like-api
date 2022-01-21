import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  emailOrPseudo: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
