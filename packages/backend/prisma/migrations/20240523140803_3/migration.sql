/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `agency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refresh_token` to the `agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agency" ADD COLUMN     "refresh_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "agency_phone_key" ON "agency"("phone");
