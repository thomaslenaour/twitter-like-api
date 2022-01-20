import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/technical/prisma/prisma.service';

@Injectable()
export class CenterOfInterestRepository {
  constructor(private prismaService: PrismaService) {}

  async getCentersOfInterest() {
    return this.prismaService.centerOfInterest.findMany();
  }
}
