/*
  Warnings:

  - You are about to drop the column `coursesId` on the `Children` table. All the data in the column will be lost.
  - You are about to drop the column `childrenId` on the `Courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_childrenId_fkey";

-- AlterTable
ALTER TABLE "Children" DROP COLUMN "coursesId";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "childrenId";

-- CreateTable
CREATE TABLE "_ChildrenToCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChildrenToCourses_AB_unique" ON "_ChildrenToCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_ChildrenToCourses_B_index" ON "_ChildrenToCourses"("B");

-- AddForeignKey
ALTER TABLE "_ChildrenToCourses" ADD FOREIGN KEY ("A") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChildrenToCourses" ADD FOREIGN KEY ("B") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
