/*
  Warnings:

  - Changed the type of `name` on the `Options` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OptionEnum" AS ENUM ('INSSURANCE', 'MEMBERSH1PFEE1', 'MEMBERSHIPFEE2');

-- AlterTable
ALTER TABLE "Options" DROP COLUMN "name",
ADD COLUMN     "name" "OptionEnum" NOT NULL;
