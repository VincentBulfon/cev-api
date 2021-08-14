/*
  Warnings:

  - Made the column `course_id` on table `Cancellations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cancellations" ALTER COLUMN "course_id" SET NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
