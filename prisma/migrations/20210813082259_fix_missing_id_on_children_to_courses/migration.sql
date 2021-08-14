/*
  Warnings:

  - The primary key for the `ChildrenToCourses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ChildrenToCourses" DROP CONSTRAINT "ChildrenToCourses_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
