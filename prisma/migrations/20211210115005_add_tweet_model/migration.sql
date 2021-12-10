-- CreateEnum
CREATE TYPE "TweetType" AS ENUM ('PARENT', 'RESPONSE');

-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(280) NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" "TweetType" NOT NULL DEFAULT E'PARENT',
    "parentTweetId" TEXT,
    "parentResponseId" TEXT,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tweet_parentResponseId_key" ON "Tweet"("parentResponseId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_parentTweetId_fkey" FOREIGN KEY ("parentTweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_parentResponseId_fkey" FOREIGN KEY ("parentResponseId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
