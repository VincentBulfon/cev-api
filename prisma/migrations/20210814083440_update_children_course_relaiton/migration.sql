/*
  Warnings:

  - You are about to drop the `ChildrenToCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChildrenToCourses" DROP CONSTRAINT "ChildrenToCourses_child_id_fkey";

-- DropForeignKey
ALTER TABLE "ChildrenToCourses" DROP CONSTRAINT "ChildrenToCourses_course_id_fkey";

-- DropTable
DROP TABLE "ChildrenToCourses";

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
