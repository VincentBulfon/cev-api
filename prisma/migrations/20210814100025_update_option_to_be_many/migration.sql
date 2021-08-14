-- CreateTable
CREATE TABLE "_OptionOnOrdersToOptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionOnOrdersToOptions_AB_unique" ON "_OptionOnOrdersToOptions"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionOnOrdersToOptions_B_index" ON "_OptionOnOrdersToOptions"("B");

-- AddForeignKey
ALTER TABLE "_OptionOnOrdersToOptions" ADD FOREIGN KEY ("A") REFERENCES "OptionOnOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionOnOrdersToOptions" ADD FOREIGN KEY ("B") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
