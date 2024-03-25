/*
  Warnings:

  - You are about to drop the column `bankEntity` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `movementType` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `operationType` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `financialEntitiesId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operationTypeId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovementType" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "bankEntity",
DROP COLUMN "movementType",
DROP COLUMN "operationType",
ADD COLUMN     "financialEntitiesId" TEXT NOT NULL,
ADD COLUMN     "operationTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "OperationType" (
    "id" TEXT NOT NULL,
    "nameEs" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OperationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialEntity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinancialEntity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_operationTypeId_fkey" FOREIGN KEY ("operationTypeId") REFERENCES "OperationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_financialEntitiesId_fkey" FOREIGN KEY ("financialEntitiesId") REFERENCES "FinancialEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
