/*
  Warnings:

  - You are about to alter the column `day_of_week` on the `Courses` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "day_of_week" SET DATA TYPE SMALLINT;
