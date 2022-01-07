import { Prisma } from '@prisma/client';

export const follows: Prisma.FollowsCreateManyInput[] = [
  {
    followerId: 'cjld2cyuq0000t3rmniod1foy', // Thomas
    followingId: 'cjld2cjxh0000qzrmn831i7rn', // Alex
  },
  {
    followerId: 'cky4c2w48000008jwcdfn16rl', // Sascha
    followingId: 'cjld2cjxh0000qzrmn831i7rn', // Alex
  },
  {
    followerId: 'cjld2cjxh0000qzrmn831i7rn', // Alex
    followingId: 'cky4c2w48000008jwcdfn16rl', // Sascha
  },
  {
    followerId: 'cky4c4ddv000208jw6g8uhtoz', // Antoine
    followingId: 'cjld2cyuq0000t3rmniod1foy', // Thomas
  },
];

// Alex follow Thomas
// Alex follow Sascha
// Following = tous les followers où je suis le followingId
// Followers = tous les following où je suis le followerId
