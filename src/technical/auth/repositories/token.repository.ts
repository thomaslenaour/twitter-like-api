import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TokenRepository {
  constructor(private prisma: PrismaService) {}

  async getRefreshToken(
    where: keyof Prisma.UserWhereUniqueInput,
    value: string,
  ) {
    try {
      return await this.prisma.user.findUnique({ where: { [where]: value } });
    } catch (err) {
      throw err;
    }
  }

  async createRefreshToken(userId: string, ipAddress: string) {
    try {
      return await this.prisma.refreshToken.create({
        data: {
          expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          ipAddress,
          jti: uuidv4(),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new BadRequestException('The JTI already exists.');
      }
      throw err;
    }
  }

  async updateRefreshToken(jti: string, userId: string, ipAddress: string) {
    try {
      return await this.prisma.refreshToken.update({
        where: {
          jti,
        },
        data: {
          expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          ipAddress,
          jti: uuidv4(),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(
          "Token data doesn't match our database records.",
        );
      }
      throw err;
    }
  }
}
