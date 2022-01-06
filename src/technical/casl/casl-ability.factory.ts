import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { RefreshToken, Tweet, User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { Action } from './types/casl.types';

type PrismaSubjects = Subjects<{
  User: User;
  Tweet: Tweet;
  RefreshToken: RefreshToken;
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

    switch (user.role) {
      case 'ADMIN':
        can(Action.Manage, 'all');

      case 'MODERATOR':

      case 'USER':
        can(Action.Read, 'all');
        can(Action.Create, 'Tweet');
        can(Action.Update, 'Tweet', { authorId: user.id });
        can(Action.Delete, 'Tweet', { authorId: user.id });

      default:
        can(Action.Read, 'Tweet');
    }

    return build({
      detectSubjectType: (object) => object.kind,
    });
  }
}
