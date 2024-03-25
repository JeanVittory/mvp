/*
  Warnings:

  - You are about to drop the column `financialEntitiesId` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `financialEntityId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_financialEntitiesId_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "financialEntitiesId",
ADD COLUMN     "financialEntityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_financialEntityId_fkey" FOREIGN KEY ("financialEntityId") REFERENCES "FinancialEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
