/*
  Warnings:

  - You are about to drop the column `date_id` on the `Prices` table. All the data in the column will be lost.
  - You are about to drop the `Dates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prices" DROP CONSTRAINT "Prices_date_id_fkey";

-- DropIndex
DROP INDEX "Prices_date_id_unique";

-- AlterTable
ALTER TABLE "Prices" DROP COLUMN "date_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Dates";
