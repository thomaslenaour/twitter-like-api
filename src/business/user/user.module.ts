import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { FollowsService } from '../follows/follows.service';
import { FollowsRepository } from '../follows/follows.repository';

@Module({
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    FollowsService,
    FollowsRepository,
  ],
})
export class UserModule {}
