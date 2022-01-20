import { Query, Resolver } from '@nestjs/graphql';
import { CenterOfInterestService } from './centerOfInterest.service';

import { CenterOfInterest } from './model/centerOfInterest.model';

@Resolver(() => CenterOfInterest)
export class CenterOfInterestResolver {
  constructor(private centerOfInterestService: CenterOfInterestService) {}

  @Query(() => [CenterOfInterest])
  async getCentersOfInterest() {
    const centersOfInterest =
      await this.centerOfInterestService.getCentersOfInterest();

    return centersOfInterest;
  }
}
