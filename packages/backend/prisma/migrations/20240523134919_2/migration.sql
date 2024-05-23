/*
  Warnings:

  - Added the required column `address` to the `agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agency" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
