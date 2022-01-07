import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateTweetInput, CreateTweetOutput } from './dto/create-tweet.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(data: CreateTweetInput): Promise<CreateTweetOutput> {
    try {
      const createdTweet = await this.prisma.tweet.create({ data });

      return { createdTweet };
    } catch (err) {
      return {
        errorMessage: `Error with the ORM, please, verify the request and retry`,
      };
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
    return this.prisma.tweet.findUnique({
      where: {
        id,
      },
    });
  }
}
