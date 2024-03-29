/*
  Warnings:

  - You are about to drop the column `financialEntityId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `movementId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `operationTypeId` on the `Sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_financialEntityId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_movementId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_operationTypeId_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "financialEntityId",
DROP COLUMN "movementId",
DROP COLUMN "operationTypeId";

-- CreateTable
CREATE TABLE "ElectronicSale" (
    "id" TEXT NOT NULL,
    "operationTypeId" TEXT NOT NULL,
    "financialEntityId" TEXT NOT NULL,
    "debitNote" DECIMAL(65,30) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ElectronicSale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ElectronicSale" ADD CONSTRAINT "ElectronicSale_operationTypeId_fkey" FOREIGN KEY ("operationTypeId") REFERENCES "OperationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectronicSale" ADD CONSTRAINT "ElectronicSale_financialEntityId_fkey" FOREIGN KEY ("financialEntityId") REFERENCES "FinancialEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
