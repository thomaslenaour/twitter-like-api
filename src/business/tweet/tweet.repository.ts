import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateTweetInput, CreateTweetOutput } from './dto/create-tweet.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RemoveTweetInput, RemoveTweetOutput } from './dto/remove-tweet.dto';

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
