/*
  Warnings:

  - You are about to drop the column `changes` on the `audit_logs` table. All the data in the column will be lost.
  - Added the required column `new` to the `audit_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old` to the `audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "changes",
ADD COLUMN     "new" JSONB NOT NULL,
ADD COLUMN     "old" JSONB NOT NULL;
