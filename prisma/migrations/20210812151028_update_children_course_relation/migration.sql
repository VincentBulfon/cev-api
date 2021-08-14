/*
  Warnings:

  - You are about to drop the `_ChildrenToCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChildrenToCourses" DROP CONSTRAINT "_ChildrenToCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChildrenToCourses" DROP CONSTRAINT "_ChildrenToCourses_B_fkey";

-- AlterTable
ALTER TABLE "Children" ADD COLUMN     "coursesId" INTEGER;

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "childrenId" INTEGER;

-- DropTable
DROP TABLE "_ChildrenToCourses";

-- AddForeignKey
ALTER TABLE "Children" ADD FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE SET NULL ON UPDATE CASCADE;
