import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateTweetInput } from './dto/create-tweet.input';

@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(data: CreateTweetInput) {
    return this.prisma.tweet.create({ data });
  }
}
