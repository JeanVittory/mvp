-- CreateTable
CREATE TABLE "CashIncome" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CashIncome_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashIncome" ADD CONSTRAINT "CashIncome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
