/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users.resetPasswordToken_unique" ON "Users"("resetPasswordToken");
