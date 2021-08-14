/*
  Warnings:

  - You are about to drop the column `children_id` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "children_id",
ALTER COLUMN "secondary_email" DROP NOT NULL;
