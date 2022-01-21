import { Injectable } from '@nestjs/common';
import { CenterOfInterest } from './model/centerOfInterest.model';
import { PrismaService } from 'src/technical/prisma/prisma.service';
import { JwtDecodedUser } from 'src/technical/auth/types/jwt.interface';

@Injectable()
export class CenterOfInterestRepository {
  constructor(private prisma: PrismaService) {}

  async getCentersOfInterest() {
    return this.prisma.centerOfInterest.findMany();
  }

  async getCenterOfInterest(centerOfInterestId: string) {
    return await this.prisma.centerOfInterest.findUnique({
      where: { id: centerOfInterestId },
    });
  }
}
