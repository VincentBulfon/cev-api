/*
  Warnings:

  - Added the required column `prices_id` to the `Options_set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Options_set" ADD COLUMN     "prices_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prices" ADD COLUMN     "optionsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Prices" ADD FOREIGN KEY ("optionsId") REFERENCES "Options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options_set" ADD FOREIGN KEY ("prices_id") REFERENCES "Prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
