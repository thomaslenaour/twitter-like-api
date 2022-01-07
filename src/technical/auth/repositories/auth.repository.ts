import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async getUser(where: keyof Prisma.UserWhereUniqueInput, value: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { [where]: value },
      });
    } catch (err) {
      throw err;
    }
  }

  async createUser(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new BadRequestException('The email or pseudo is already taken.');
      }
      throw err;
    }
  }
}
