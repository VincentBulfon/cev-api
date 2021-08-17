/*
  Warnings:

  - You are about to drop the column `options_id` on the `Options_set` table. All the data in the column will be lost.
  - You are about to drop the column `orders_id` on the `Options_set` table. All the data in the column will be lost.
  - You are about to drop the column `prices_id` on the `Options_set` table. All the data in the column will be lost.
  - You are about to drop the column `options_id` on the `Prices` table. All the data in the column will be lost.
  - Added the required column `option_id` to the `Options_set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Options_set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_id` to the `Options_set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_id` to the `Prices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Options_set" DROP CONSTRAINT "Options_set_options_id_fkey";

-- DropForeignKey
ALTER TABLE "Options_set" DROP CONSTRAINT "Options_set_orders_id_fkey";

-- DropForeignKey
ALTER TABLE "Options_set" DROP CONSTRAINT "Options_set_prices_id_fkey";

-- DropForeignKey
ALTER TABLE "Prices" DROP CONSTRAINT "Prices_options_id_fkey";

-- AlterTable
ALTER TABLE "Options_set" DROP COLUMN "options_id",
DROP COLUMN "orders_id",
DROP COLUMN "prices_id",
ADD COLUMN     "option_id" INTEGER NOT NULL,
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "price_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prices" DROP COLUMN "options_id",
ADD COLUMN     "option_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Prices" ADD FOREIGN KEY ("option_id") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options_set" ADD FOREIGN KEY ("option_id") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options_set" ADD FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options_set" ADD FOREIGN KEY ("price_id") REFERENCES "Prices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
