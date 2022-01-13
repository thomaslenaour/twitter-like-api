import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/technical/prisma/prisma.service';

import { CreateTweetInteractionDto } from './dto/create-tweetInteraction.dto';
import { GetUniqueTweetInteractionDto } from './dto/get-tweetInteraction.dto';

@Injectable()
export class TweetInteractionRepository {
  constructor(private prisma: PrismaService) {}

  async getUniqueTweetInteraction(data: GetUniqueTweetInteractionDto) {
    try {
      return await this.prisma.tweetInteraction.findUnique({
        where: {
          tweetId_userId_type: {
            tweetId: data.tweetId,
            userId: data.userId,
            type: data.type,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createTweetInteraction(data: CreateTweetInteractionDto) {
    try {
      return await this.prisma.tweetInteraction.create({ data });
    } catch (err) {
      throw err;
    }
  }

  async deleteTweetInteraction(tweetInteractionId: string) {
    try {
      return await this.prisma.tweetInteraction.delete({
        where: { id: tweetInteractionId },
      });
    } catch (err) {
      throw err;
    }
  }
}
