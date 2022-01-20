import { Module } from '@nestjs/common';
import { CenterOfInterestRepository } from './centerOfInterest.repository';
import { CenterOfInterestService } from './centerOfInterest.service';

@Module({
  providers: [CenterOfInterestService, CenterOfInterestRepository],
})
export class CenterOfInterest {}
