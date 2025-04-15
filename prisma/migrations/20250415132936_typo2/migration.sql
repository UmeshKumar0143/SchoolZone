/*
  Warnings:

  - You are about to drop the column `assignementId` on the `Result` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_assignementId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "assignementId",
ADD COLUMN     "assignmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
