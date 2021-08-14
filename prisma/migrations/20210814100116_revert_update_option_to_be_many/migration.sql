/*
  Warnings:

  - You are about to drop the `_OptionOnOrdersToOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OptionOnOrdersToOptions" DROP CONSTRAINT "_OptionOnOrdersToOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionOnOrdersToOptions" DROP CONSTRAINT "_OptionOnOrdersToOptions_B_fkey";

-- DropTable
DROP TABLE "_OptionOnOrdersToOptions";
