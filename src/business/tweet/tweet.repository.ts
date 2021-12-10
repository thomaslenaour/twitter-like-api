import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/technical/prisma/prisma.service';

@Injectable()
export class TweetRepository {
  constructor(private readonly prisma: PrismaService) {}
}
