/*
  Warnings:

  - The `debitNote` column on the `Sale` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "debitNote",
ADD COLUMN     "debitNote" DECIMAL(65,30);
