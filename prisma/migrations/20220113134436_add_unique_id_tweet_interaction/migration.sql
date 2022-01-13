/*
  Warnings:

  - The primary key for the `TweetInteraction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TweetInteraction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TweetInteraction_tweetId_userId_type_key";

-- AlterTable
ALTER TABLE "TweetInteraction" DROP CONSTRAINT "TweetInteraction_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TweetInteraction_pkey" PRIMARY KEY ("tweetId", "userId", "type");
