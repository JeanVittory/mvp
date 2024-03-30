/*
  Warnings:

  - Added the required column `debitNote` to the `CashIncome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CashIncome" ADD COLUMN     "debitNote" DECIMAL(65,30) NOT NULL;
