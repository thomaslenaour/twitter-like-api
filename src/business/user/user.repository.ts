import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/technical/prisma/prisma.service';

import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async createUser(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }
}
