import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async truncate() {
    const records = await this.$queryRawUnsafe<any[]>(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
    );

    records.forEach((record) => this.truncateTable(record['tablename']));
  }

  async truncateTable(tableName) {
    if (tableName === undefined || tableName === '_prisma_migrations') {
      return;
    }

    try {
      await this.$executeRawUnsafe(
        `TRUNCATE TABLE "public"."${tableName}" CASCADE;`,
      );
    } catch (err) {
      console.error(err);
    }
  }

  async resetSequences() {
    const results = await this.$queryRawUnsafe<any[]>(
      `SELECT c.relname
      FROM pg_class c
        JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE c.relkind = 'S'
        AND n.nspname = 'public'`,
    );

    for (const { record } of results) {
      await this.$executeRawUnsafe(
        `ALTER SEQUENCE "public"."${record['relname']}" RESTART WITH 1;`,
      );
    }
  }
}
