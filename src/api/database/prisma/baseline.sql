-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enterprise" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Password" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pass" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Outflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "totalAmount" DECIMAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Outflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MovementType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameEs" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OperationType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameEs" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FinancialEntity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ElectronicSale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "operationTypeId" TEXT NOT NULL,
    "financialEntityId" TEXT NOT NULL,
    "debitNote" DECIMAL NOT NULL,
    "totalAmount" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ElectronicSale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ElectronicSale_operationTypeId_fkey" FOREIGN KEY ("operationTypeId") REFERENCES "OperationType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ElectronicSale_financialEntityId_fkey" FOREIGN KEY ("financialEntityId") REFERENCES "FinancialEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CashIncome" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalAmount" DECIMAL NOT NULL,
    "debitNote" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CashIncome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CashCount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "denomination" DECIMAL NOT NULL,
    "currencyType" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "total" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "debitNote" DECIMAL,
    "description" TEXT,
    "totalAmount" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AllTransactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movementTypeId" TEXT NOT NULL,
    "outflowId" TEXT,
    "electronicSaleId" TEXT,
    "cashIncomeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AllTransactions_movementTypeId_fkey" FOREIGN KEY ("movementTypeId") REFERENCES "MovementType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AllTransactions_outflowId_fkey" FOREIGN KEY ("outflowId") REFERENCES "Outflow" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AllTransactions_electronicSaleId_fkey" FOREIGN KEY ("electronicSaleId") REFERENCES "ElectronicSale" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AllTransactions_cashIncomeId_fkey" FOREIGN KEY ("cashIncomeId") REFERENCES "CashIncome" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

