/*
  Warnings:

  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Orders";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "TotalPrice" INTEGER NOT NULL,
    "Products" JSONB NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
