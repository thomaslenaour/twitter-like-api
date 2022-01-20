import { Query, Resolver } from '@nestjs/graphql';
import { CenterOfInterest } from './centerOfInterest.module';
import { CenterOfInterestService } from './centerOfInterest.service';

@Resolver(CenterOfInterest)
export class CenterOfInterestResolver {
  constructor(private centerOfInterestService: CenterOfInterestService) {}

  @Query(() => Boolean)
  async getCentersOfInterest() {
    const centersOfInterest =
      await this.centerOfInterestService.getCentersOfInterest();
    console.log(centersOfInterest);

    return true;
  }
}
