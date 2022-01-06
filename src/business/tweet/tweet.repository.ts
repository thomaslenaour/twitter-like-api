import { Injectable } from '@nestjs/common';
import { Tweet } from '@prisma/client';

import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateTweetInput } from './dto/create-tweet.dto';

@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(data: CreateTweetInput): Promise<Tweet> {
    return this.prisma.tweet.create({ data });
  }
}
