-- DropForeignKey
ALTER TABLE "boards" DROP CONSTRAINT "boards_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
