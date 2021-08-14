/*
  Warnings:

  - Added the required column `day_of_week` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "day_of_week" INTEGER NOT NULL,
ALTER COLUMN "end_time" SET DATA TYPE TIME,
ALTER COLUMN "start_time" SET DATA TYPE TIME;
