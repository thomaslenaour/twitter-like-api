/*
  Warnings:

  - A unique constraint covering the columns `[tweetId,userId,type]` on the table `TweetInteraction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TweetInteraction_tweetId_userId_type_key" ON "TweetInteraction"("tweetId", "userId", "type");
