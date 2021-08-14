/*
  Warnings:

  - You are about to drop the `OptionOnOrders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OptionOnOrders" DROP CONSTRAINT "OptionOnOrders_options_id_fkey";

-- DropForeignKey
ALTER TABLE "OptionOnOrders" DROP CONSTRAINT "OptionOnOrders_orders_id_fkey";

-- DropTable
DROP TABLE "OptionOnOrders";

-- CreateTable
CREATE TABLE "Options_Set" (
    "id" SERIAL NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT E'UNPAID',
    "paid_at" TIMESTAMP(3) NOT NULL,
    "cancelled_at" TIMESTAMP(3) NOT NULL,
    "options_id" INTEGER NOT NULL,
    "orders_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Options_Set_orders_id_unique" ON "Options_Set"("orders_id");

-- AddForeignKey
ALTER TABLE "Options_Set" ADD FOREIGN KEY ("options_id") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options_Set" ADD FOREIGN KEY ("orders_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
