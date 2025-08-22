/*
  Warnings:

  - You are about to drop the column `subUnidadeId` on the `pontos_de_medicao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pontoDeMedicaoId]` on the table `sub_unidades` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."pontos_de_medicao" DROP CONSTRAINT "pontos_de_medicao_subUnidadeId_fkey";

-- DropIndex
DROP INDEX "public"."pontos_de_medicao_subUnidadeId_key";

-- AlterTable
ALTER TABLE "public"."pontos_de_medicao" DROP COLUMN "subUnidadeId";

-- AlterTable
ALTER TABLE "public"."sub_unidades" ADD COLUMN     "pontoDeMedicaoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sub_unidades_pontoDeMedicaoId_key" ON "public"."sub_unidades"("pontoDeMedicaoId");

-- AddForeignKey
ALTER TABLE "public"."sub_unidades" ADD CONSTRAINT "sub_unidades_pontoDeMedicaoId_fkey" FOREIGN KEY ("pontoDeMedicaoId") REFERENCES "public"."pontos_de_medicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
