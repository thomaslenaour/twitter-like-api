import { Injectable } from '@nestjs/common';

import { FollowsRepository } from './follows.repository';

@Injectable()
export class FollowsService {
  constructor(private followsRepository: FollowsRepository) {}

  getFollowers(userId: string) {
    return this.followsRepository.getFollowers(userId);
  }

  getFollowing(userId: string) {
    return this.followsRepository.getFollowing(userId);
  }

  follow(followerId: string, followingId: string) {
    return this.followsRepository.createFollow(followerId, followingId);
  }

  unfollow(followerId: string, followingId: string) {
    return this.followsRepository.deleteFollow(followerId, followingId);
  }
}
