import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtDecodedUser } from 'src/technical/auth/types/jwt.interface';

import { PrismaService } from 'src/technical/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(where: keyof Prisma.UserWhereUniqueInput, value: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { [where]: value },
      });
    } catch (err) {
      throw err;
    }
  }

  async createUser(data: CreateUserDto) {
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

  async updateUser(data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id: data.userId },
        data,
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log('++++errr++++');
        console.log(err);
        console.log('++++errr++++');
      }
      throw err;
    }
  }

  async getCompatibleUsersList(user: JwtDecodedUser) {
    const { centerOfInterests } = await this.prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      select: {
        centerOfInterests: true,
      },
    });

    const centersOfInterestId = centerOfInterests.map(
      (centerOfInterest) => centerOfInterest.id,
    );

    return this.prisma.user.findMany({
      where: {
        id: {
          not: user.userId,
        },
        centerOfInterests: {
          some: {
            id: {
              in: centersOfInterestId,
            },
          },
        },
      },
      orderBy: {
        centerOfInterests: {
          _count: 'desc',
        },
      },
    });
  }

  async getUserCentersOfInterest(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        centerOfInterests: true,
      },
    });
  }
}
