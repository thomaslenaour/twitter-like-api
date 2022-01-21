import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from 'src/technical/models/base-model';

@ObjectType()
export class CenterOfInterest extends BaseModel {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
