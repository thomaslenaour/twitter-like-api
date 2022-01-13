-- CreateEnum
CREATE TYPE "TweetInteractionType" AS ENUM ('RETWEET', 'LIKE');

-- CreateTable
CREATE TABLE "TweetInteraction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL DEFAULT E'TweetInteraction',
    "type" "TweetInteractionType" NOT NULL,
    "tweetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TweetInteraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TweetInteraction" ADD CONSTRAINT "TweetInteraction_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetInteraction" ADD CONSTRAINT "TweetInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
