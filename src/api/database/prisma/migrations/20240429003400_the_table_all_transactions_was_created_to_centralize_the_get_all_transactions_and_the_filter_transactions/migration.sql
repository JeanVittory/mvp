-- CreateTable
CREATE TABLE "AllTransactions" (
    "id" TEXT NOT NULL,
    "movementTypeId" TEXT NOT NULL,
    "outflowId" TEXT,
    "electronicSaleId" TEXT,
    "cashIncomeId" TEXT,

    CONSTRAINT "AllTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AllTransactions" ADD CONSTRAINT "AllTransactions_movementTypeId_fkey" FOREIGN KEY ("movementTypeId") REFERENCES "MovementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllTransactions" ADD CONSTRAINT "AllTransactions_outflowId_fkey" FOREIGN KEY ("outflowId") REFERENCES "Outflow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllTransactions" ADD CONSTRAINT "AllTransactions_electronicSaleId_fkey" FOREIGN KEY ("electronicSaleId") REFERENCES "ElectronicSale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllTransactions" ADD CONSTRAINT "AllTransactions_cashIncomeId_fkey" FOREIGN KEY ("cashIncomeId") REFERENCES "CashIncome"("id") ON DELETE SET NULL ON UPDATE CASCADE;
