import { Module } from '@nestjs/common';
import { CenterOfInterestRepository } from './centerOfInterest.repository';
import { CenterOfInterestResolver } from './centerOfInterest.resolver';
import { CenterOfInterestService } from './centerOfInterest.service';

@Module({
  providers: [
    CenterOfInterestService,
    CenterOfInterestRepository,
    CenterOfInterestResolver,
  ],
})
export class CenterOfInterestModule {}
