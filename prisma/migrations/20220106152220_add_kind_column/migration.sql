-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "kind" TEXT NOT NULL DEFAULT E'RefreshToken';

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "kind" TEXT NOT NULL DEFAULT E'Tweet';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "kind" TEXT NOT NULL DEFAULT E'User';
