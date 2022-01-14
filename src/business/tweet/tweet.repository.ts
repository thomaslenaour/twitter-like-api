import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateTweetInput } from './dto/create-tweet.input';

@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(data: CreateTweetInput) {
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

  async getTweets(userId: string) {
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
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          parentResponseTweet: true,
          parentTweet: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
