/*
  Warnings:

  - Made the column `optionsId` on table `Prices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Prices" ALTER COLUMN "optionsId" SET NOT NULL;
