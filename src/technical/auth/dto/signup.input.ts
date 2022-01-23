import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@InputType()
export class SignupInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  pseudo: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;

  @IsDate()
  @IsNotEmpty()
  @Field()
  birthDate: Date;

  @IsArray()
  @IsString({ each: true })
  @Field(() => [String])
  centerOfInterests: string[];
}
