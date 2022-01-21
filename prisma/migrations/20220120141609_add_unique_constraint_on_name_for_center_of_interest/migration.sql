/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CenterOfInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CenterOfInterest_name_key" ON "CenterOfInterest"("name");
