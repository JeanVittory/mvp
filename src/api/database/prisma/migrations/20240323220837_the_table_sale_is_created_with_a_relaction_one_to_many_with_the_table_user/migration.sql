-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "movementType" TEXT NOT NULL,
    "operationType" TEXT,
    "bankEntity" TEXT,
    "debitNote" TEXT,
    "description" TEXT,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
