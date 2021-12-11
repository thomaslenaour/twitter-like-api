import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
