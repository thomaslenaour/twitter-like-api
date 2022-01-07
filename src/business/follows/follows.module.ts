import { Module } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

import { FollowsRepository } from './follows.repository';

import { FollowsResolver } from './follows.resolver';

import { FollowsService } from './follows.service';

@Module({
  providers: [
    FollowsResolver,
    FollowsService,
    FollowsRepository,
    UserService,
    UserRepository,
  ],
})
export class FollowsModule {}
