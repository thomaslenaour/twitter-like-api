import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { GetTweetsDto } from './dto/get-tweets.dto';

@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(data: CreateTweetDto) {
    try {
      return await this.prisma.tweet.create({ data });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new BadRequestException(
          "Unique constraint violation, can't create a tweet with the provided data.",
        );
      }
      throw err;
    }
  }

  async removeTweet(tweetId: string) {
    try {
      return await this.prisma.tweet.delete({
        where: {
          id: tweetId,
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Tweet not found for the following id : ${tweetId}`,
        );
      }
      throw err;
    }
  }

  async getTweet(id: string) {
    try {
      return await this.prisma.tweet.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getResponseTweets(parentTweetId: string) {
    try {
      return await this.prisma.tweet.findMany({
        where: {
          parentTweetId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getResponseResponseTweets(parentResponseTweetId: string) {
    try {
      return await this.prisma.tweet.findMany({
        where: {
          parentResponseTweetId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getParentTweets(userId: string, args: GetTweetsDto) {
    try {
      const { following } = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          following: {
            select: {
              followerId: true,
            },
          },
        },
      });

      const subscriptionsId = following.map((following) => {
        return following.followerId;
      });

      return await this.prisma.tweet.findMany({
        where: {
          authorId: {
            in: subscriptionsId,
          },
          type: 'PARENT',
          ...(args.filter && {
            content: { contains: args.filter, mode: 'insensitive' },
          }),
        },
        orderBy: {
          createdAt: 'desc',
        },
        ...(args.skip && args.take && { skip: args.skip, take: args.take }),
      });
    } catch (err) {
      throw err;
    }
  }
}
