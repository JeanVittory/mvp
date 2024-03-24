/*
  Warnings:

  - Added the required column `movementId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "movementId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MovementType" (
    "id" TEXT NOT NULL,
    "nameEs" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "MovementType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "MovementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
