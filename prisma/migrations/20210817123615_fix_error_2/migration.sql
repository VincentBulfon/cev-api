/*
  Warnings:

  - You are about to drop the column `users_id` on the `Orders` table. All the data in the column will be lost.
  - Changed the type of `name` on the `Options` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `user_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NameEnum" AS ENUM ('INSSURANCE', 'MEMBERSH1PFEE1', 'MEMBERSHIPFEE2');

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_users_id_fkey";

-- AlterTable
ALTER TABLE "Options" DROP COLUMN "name",
ADD COLUMN     "name" "NameEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "users_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "OptionEnum";

-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
