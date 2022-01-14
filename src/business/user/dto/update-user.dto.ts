import { InputType } from '@nestjs/graphql';

import { UpdateUserInput } from './update-user.input';

@InputType()
export class UpdateUserDto extends UpdateUserInput {}
