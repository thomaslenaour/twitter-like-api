import { Injectable } from '@nestjs/common';
import { CenterOfInterestRepository } from './centerOfInterest.repository';

@Injectable()
export class CenterOfInterestService {
  constructor(private centerOfInterestRepository: CenterOfInterestRepository) {}

  async getCentersOfInterest() {
    return this.centerOfInterestRepository.getCentersOfInterest();
  }
}
