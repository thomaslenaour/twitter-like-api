import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from 'src/technical/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new Error(`The email or pseudo is already taken.`);
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
