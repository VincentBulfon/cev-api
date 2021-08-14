-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dates" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prices" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prices_dateId_unique" ON "Prices"("dateId");

-- AddForeignKey
ALTER TABLE "Prices" ADD FOREIGN KEY ("dateId") REFERENCES "Dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
