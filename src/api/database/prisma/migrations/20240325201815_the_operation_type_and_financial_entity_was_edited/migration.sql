-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_financialEntityId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_operationTypeId_fkey";

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "operationTypeId" DROP NOT NULL,
ALTER COLUMN "financialEntityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_operationTypeId_fkey" FOREIGN KEY ("operationTypeId") REFERENCES "OperationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_financialEntityId_fkey" FOREIGN KEY ("financialEntityId") REFERENCES "FinancialEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
