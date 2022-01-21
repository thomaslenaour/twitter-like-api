import { Injectable, NotFoundException } from '@nestjs/common';
import { CenterOfInterestRepository } from './centerOfInterest.repository';

@Injectable()
export class CenterOfInterestService {
  constructor(private centerOfInterestRepository: CenterOfInterestRepository) {}

  async getCentersOfInterest() {
    return this.centerOfInterestRepository.getCentersOfInterest();
  }

  async getCenterOfInterest(centerOfInterestId: string) {
    const centerOfInterest =
      await this.centerOfInterestRepository.getCenterOfInterest(
        centerOfInterestId,
      );

    if (!centerOfInterest) {
      throw new NotFoundException(
        `Cannot find center of interest where id is equal to ${centerOfInterestId}`,
      );
    }

    return centerOfInterest;
  }
}
