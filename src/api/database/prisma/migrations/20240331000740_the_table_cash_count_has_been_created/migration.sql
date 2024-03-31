-- CreateTable
CREATE TABLE "CashCount" (
    "id" TEXT NOT NULL,
    "denomination" DECIMAL(65,30) NOT NULL,
    "currencyType" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CashCount_pkey" PRIMARY KEY ("id")
);
