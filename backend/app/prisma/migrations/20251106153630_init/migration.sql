/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Order";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "TotalPrice" INTEGER NOT NULL,
    "Products" JSONB NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
