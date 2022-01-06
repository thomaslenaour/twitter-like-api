import { Injectable } from '@nestjs/common';
import { Tweet } from '@prisma/client';
import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateTweetInput } from './dto/create-tweet.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RemoveTweetInput, RemoveTweetOutput } from './dto/remove-tweet.dto';

@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(data: CreateTweetInput): Promise<Tweet> {
    return this.prisma.tweet.create({ data });
  }

  async removeTweet(data: RemoveTweetInput): Promise<RemoveTweetOutput> {
    try {
      const deletedTweet = await this.prisma.tweet.delete({
        where: {
          id: data.tweetId,
        },
      });
      return { deletedTweet };
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return {
          errorMessage: `Tweet not found for the following id : ${data.tweetId}`,
        };
      }
      return { errorMessage: err.message };
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
