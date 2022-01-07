-- CreateEnum
CREATE TYPE "TweetType" AS ENUM ('PARENT', 'RESPONSE', 'RESPONSE_TO_RESPONSE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL DEFAULT E'User',
    "name" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "phoneNumber" TEXT,
    "avatarUrl" TEXT,
    "bannerUrl" TEXT,
    "websiteUrl" TEXT,
    "location" TEXT,
    "role" "UserRole" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL DEFAULT E'Tweet',
    "content" VARCHAR(280) NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" "TweetType" NOT NULL DEFAULT E'PARENT',
    "parentTweetId" TEXT,
    "parentResponseId" TEXT,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL DEFAULT E'RefreshToken',
    "userId" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tweet_parentResponseId_key" ON "Tweet"("parentResponseId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jti_key" ON "RefreshToken"("jti");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_parentTweetId_fkey" FOREIGN KEY ("parentTweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_parentResponseId_fkey" FOREIGN KEY ("parentResponseId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
