/*
  Warnings:

  - You are about to drop the column `productId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `name` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "productId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
