/*
  Warnings:

  - You are about to drop the `ChildrenOnCourses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChildrenToCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChildrenOnCourses" DROP CONSTRAINT "ChildrenOnCourses_childId_fkey";

-- DropForeignKey
ALTER TABLE "ChildrenOnCourses" DROP CONSTRAINT "ChildrenOnCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "_ChildrenToCourses" DROP CONSTRAINT "_ChildrenToCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChildrenToCourses" DROP CONSTRAINT "_ChildrenToCourses_B_fkey";

-- DropTable
DROP TABLE "ChildrenOnCourses";

-- DropTable
DROP TABLE "_ChildrenToCourses";

-- CreateTable
CREATE TABLE "ChildrenToCourses" (
    "childId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("childId","courseId")
);

-- AddForeignKey
ALTER TABLE "ChildrenToCourses" ADD FOREIGN KEY ("childId") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenToCourses" ADD FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
