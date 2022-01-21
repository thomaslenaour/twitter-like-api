import { PrismaClient } from '@prisma/client';

import config from '../config/config';
import * as seedData from '../seeds';

const prisma = new PrismaClient();

const main = async () => {
  process.stdout.write('\n');
  console.log(`🚜 Starting seeds...`);
  process.stdout.write('\n');

  try {
    for (const model of config().database.seed.models) {
      if (seedData[model].length > 0) {
        console.log(
          `🎯 Starting generate ${seedData[model].length} ${model}...`,
        );

        for (const value of seedData[model]) {
          if (model === 'follows') {
            await prisma[model].upsert({
              where: {
                followerId_followingId: {
                  followerId: value.followerId,
                  followingId: value.followingId,
                },
              },
              create: value,
              update: {},
            });
          } else {
            await prisma[model].upsert({
              where: {
                id: value.id,
              },
              create: value,
              update: {},
            });
          }
        }

        console.log(
          `🔥 ${seedData[model].length} elements in ${model} inserted.`,
        );
        process.stdout.write('\n');
      }
    }
  } catch (err) {
    throw err;
  }
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
