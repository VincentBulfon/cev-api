-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "usersId" INTEGER;

-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
