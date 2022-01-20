-- CreateTable
CREATE TABLE "CenterOfInterest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CenterOfInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CenterOfInterestToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CenterOfInterestToUser_AB_unique" ON "_CenterOfInterestToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CenterOfInterestToUser_B_index" ON "_CenterOfInterestToUser"("B");

-- AddForeignKey
ALTER TABLE "_CenterOfInterestToUser" ADD FOREIGN KEY ("A") REFERENCES "CenterOfInterest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CenterOfInterestToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
