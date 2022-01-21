import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/technical/prisma/prisma.service';

import { GetOrCreateOrDeleteTweetInteractionDto } from './dto/tweetInteraction.dto';

@Injectable()
export class TweetInteractionRepository {
  constructor(private prisma: PrismaService) {}

  async getTweetInteractions(tweetId: string) {
    try {
      return await this.prisma.tweetInteraction.findMany({
        where: { tweetId },
      });
    } catch (err) {
      throw err;
    }
  }

  async getUniqueTweetInteraction(
    data: GetOrCreateOrDeleteTweetInteractionDto,
  ) {
    try {
      return await this.prisma.tweetInteraction.findUnique({
        where: {
          tweetId_userId_type: data,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createTweetInteraction(data: GetOrCreateOrDeleteTweetInteractionDto) {
    try {
      return await this.prisma.tweetInteraction.create({ data });
    } catch (err) {
      throw err;
    }
  }

  async deleteTweetInteraction(data: GetOrCreateOrDeleteTweetInteractionDto) {
    try {
      return await this.prisma.tweetInteraction.delete({
        where: { tweetId_userId_type: data },
      });
    } catch (err) {
      throw err;
    }
  }
}
