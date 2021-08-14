/*
  Warnings:

  - You are about to drop the column `coursesId` on the `Cancellations` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `Children` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Children` table. All the data in the column will be lost.
  - You are about to drop the column `tutorId` on the `Children` table. All the data in the column will be lost.
  - The primary key for the `ChildrenToCourses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedAt` on the `ChildrenToCourses` table. All the data in the column will be lost.
  - You are about to drop the column `childId` on the `ChildrenToCourses` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `ChildrenToCourses` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `dateId` on the `Prices` table. All the data in the column will be lost.
  - You are about to drop the column `childrenId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryEmail` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `verfifedAt` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date_id]` on the table `Prices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birth_date` to the `Children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutor_id` to the `Children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_id` to the `ChildrenToCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `ChildrenToCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_id` to the `Prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `children_id` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary_email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cancellations" DROP CONSTRAINT "Cancellations_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "ChildrenToCourses" DROP CONSTRAINT "ChildrenToCourses_childId_fkey";

-- DropForeignKey
ALTER TABLE "ChildrenToCourses" DROP CONSTRAINT "ChildrenToCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Prices" DROP CONSTRAINT "Prices_dateId_fkey";

-- DropIndex
DROP INDEX "Prices_dateId_unique";

-- AlterTable
ALTER TABLE "Cancellations" DROP COLUMN "coursesId",
ADD COLUMN     "course_id" INTEGER;

-- AlterTable
ALTER TABLE "Children" DROP COLUMN "birthDate",
DROP COLUMN "firstName",
DROP COLUMN "tutorId",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "tutor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ChildrenToCourses" DROP CONSTRAINT "ChildrenToCourses_pkey",
DROP COLUMN "assignedAt",
DROP COLUMN "childId",
DROP COLUMN "courseId",
ADD COLUMN     "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "child_id" INTEGER NOT NULL,
ADD COLUMN     "course_id" INTEGER NOT NULL,
ADD PRIMARY KEY ("child_id", "course_id");

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Prices" DROP COLUMN "dateId",
ADD COLUMN     "date_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "childrenId",
DROP COLUMN "createAt",
DROP COLUMN "deletedAt",
DROP COLUMN "firstName",
DROP COLUMN "phoneNumber",
DROP COLUMN "secondaryEmail",
DROP COLUMN "verfifedAt",
ADD COLUMN     "children_id" INTEGER NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "secondary_email" TEXT NOT NULL,
ADD COLUMN     "verfifed_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Prices_date_id_unique" ON "Prices"("date_id");

-- AddForeignKey
ALTER TABLE "Children" ADD FOREIGN KEY ("tutor_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenToCourses" ADD FOREIGN KEY ("child_id") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenToCourses" ADD FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cancellations" ADD FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD FOREIGN KEY ("date_id") REFERENCES "Dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
