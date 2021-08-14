-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionOnOrders" (
    "id" SERIAL NOT NULL,
    "options_id" INTEGER NOT NULL,
    "orders_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OptionsToOrders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionsToOrders_AB_unique" ON "_OptionsToOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionsToOrders_B_index" ON "_OptionsToOrders"("B");

-- AddForeignKey
ALTER TABLE "OptionOnOrders" ADD FOREIGN KEY ("options_id") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionOnOrders" ADD FOREIGN KEY ("orders_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionsToOrders" ADD FOREIGN KEY ("A") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionsToOrders" ADD FOREIGN KEY ("B") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
