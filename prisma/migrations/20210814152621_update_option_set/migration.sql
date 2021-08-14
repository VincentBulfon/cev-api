/*
  Warnings:

  - You are about to drop the column `usersId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `optionsId` on the `Prices` table. All the data in the column will be lost.
  - Added the required column `users_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options_id` to the `Prices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Prices" DROP CONSTRAINT "Prices_optionsId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "usersId",
ADD COLUMN     "users_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prices" DROP COLUMN "optionsId",
ADD COLUMN     "options_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Prices" ADD FOREIGN KEY ("options_id") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
