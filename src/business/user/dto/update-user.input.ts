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
  id: string;

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

  @IsOptional()
  @Field({ nullable: true })
  websiteUrl?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  bannerUrl?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  location?: string;
}
