import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/technical/prisma/prisma.service';

@Injectable()
export class FollowsRepository {
  constructor(private prisma: PrismaService) {}

  async getFollowers(userId: string) {
    try {
      return await this.prisma.follows.findMany({
        where: {
          followerId: userId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getFollowing(userId: string) {
    try {
      return await this.prisma.follows.findMany({
        where: {
          followingId: userId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createFollow(followerId: string, followingId: string) {
    try {
      return await this.prisma.follows.create({
        data: {
          followerId,
          followingId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteFollow(followerId: string, followingId: string) {
    try {
      return await this.prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
