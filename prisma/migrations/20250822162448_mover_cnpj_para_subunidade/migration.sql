/*
  Warnings:

  - You are about to drop the column `cnpj` on the `unidades` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subUnidadeId]` on the table `pontos_de_medicao` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."unidades_cnpj_key";

-- AlterTable
ALTER TABLE "public"."sub_unidades" ADD COLUMN     "cnpj" TEXT;

-- AlterTable
ALTER TABLE "public"."unidades" DROP COLUMN "cnpj";

-- CreateIndex
CREATE UNIQUE INDEX "pontos_de_medicao_subUnidadeId_key" ON "public"."pontos_de_medicao"("subUnidadeId");
