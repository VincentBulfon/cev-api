/*
  Warnings:

  - Added the required column `paid_at` to the `OptionOnOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OptionOnOrders" ADD COLUMN     "paid_at" TIMESTAMP(3) NOT NULL;
