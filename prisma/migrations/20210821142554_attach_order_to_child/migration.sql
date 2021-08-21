/*
  Warnings:

  - You are about to drop the column `user_id` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `child_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_user_id_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "user_id",
ADD COLUMN     "child_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("child_id") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
