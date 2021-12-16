import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from 'src/technical/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(where: keyof Prisma.UserWhereUniqueInput, value: string) {
    return this.prisma.user.findUnique({ where: { [where]: value } });
  }

  async createUser(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new Error('User already exists with this email or pseudo.');
        }
      }
      throw err;
    }
  }

  async updateUser(userId: string, data: Prisma.UserUpdateInput) {
    try {
      return await this.prisma.user.update({ where: { id: userId }, data });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log('++++errr++++');
        console.log(err);
        console.log('++++errr++++');
      }
      throw err;
    }
  }
}
