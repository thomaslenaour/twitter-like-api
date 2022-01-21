import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import {
  CenterOfInterest,
  Follows,
  RefreshToken,
  Tweet,
  TweetInteraction,
  User,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { Action } from './types/casl.types';

type PrismaSubjects = Subjects<{
  User: User;
  Tweet: Tweet;
  RefreshToken: RefreshToken;
  Follows: Follows;
  TweetInteraction: TweetInteraction;
  CenterOfInterest: CenterOfInterest;
}>;

type AppSubjects = PrismaSubjects | 'all';

export type AppAbility = PrismaAbility<[Action, AppSubjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private prisma: PrismaService) {}

  async createForUser(userId: string) {
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, cannot, build } = new AbilityBuilder(AppAbility);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException(
        `Can't find any user with the provided ID.`,
      );
    }

    switch (user.role) {
      case 'ADMIN':
        can(Action.Manage, 'all');

      case 'MODERATOR':

      case 'USER':
        can(Action.Create, 'Tweet');
        can(Action.Update, 'Tweet', { authorId: user.id });
        can(Action.Delete, 'Tweet', { authorId: user.id });
        can(Action.Create, 'TweetInteraction');
        can(Action.Delete, 'TweetInteraction', { userId: user.id });

      default:
        can(Action.Read, 'all');
    }

    return build({
      detectSubjectType: (object) => object.kind,
    });
  }
}
