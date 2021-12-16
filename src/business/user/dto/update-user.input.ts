import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  userId: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  pseudo?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  websiteUrl?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  location?: string;
}
