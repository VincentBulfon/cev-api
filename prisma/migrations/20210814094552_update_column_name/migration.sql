/*
  Warnings:

  - Made the column `usersId` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "usersId" SET NOT NULL;
