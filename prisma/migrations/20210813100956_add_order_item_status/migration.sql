/*
  Warnings:

  - You are about to drop the `_OptionsToOrders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deleted_at` to the `Cancellations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cancelled_at` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('PAID', 'UNPAID', 'NOTAPPLICABLE');

-- DropForeignKey
ALTER TABLE "_OptionsToOrders" DROP CONSTRAINT "_OptionsToOrders_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionsToOrders" DROP CONSTRAINT "_OptionsToOrders_B_fkey";

-- AlterTable
ALTER TABLE "Cancellations" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OptionOnOrders" ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT E'UNPAID';

-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "cancelled_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_OptionsToOrders";
