import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtDecodedUser } from 'src/technical/auth/types/jwt.interface';
import { CurrentUser } from '../user/user.decorator';
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

  @Query(() => CenterOfInterest)
  async getCenterOfInterest(
    @Args('centerOfInterestId') centerOfInterestId: string,
  ) {
    const centerOfInterest =
      await this.centerOfInterestService.getCenterOfInterest(
        centerOfInterestId,
      );

    return centerOfInterest;
  }
}
