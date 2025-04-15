/*
  Warnings:

  - You are about to drop the column `lastname` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `dateofBirth` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Student` table. All the data in the column will be lost.
  - Added the required column `surname` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_supervisorId_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "supervisorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "lastname",
ADD COLUMN     "surname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "dateofBirth",
DROP COLUMN "lastname",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
