/*
  Warnings:

  - A unique constraint covering the columns `[dataHora,codigoSubmercado,tipo]` on the table `pld` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unidadeId` to the `pld` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."pld_dataHora_codigoSubmercado_key";

-- AlterTable
ALTER TABLE "public"."pld" ADD COLUMN     "tipo" TEXT NOT NULL DEFAULT 'HORARIO',
ADD COLUMN     "unidadeId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "pld_tipo_idx" ON "public"."pld"("tipo");

-- CreateIndex
CREATE INDEX "pld_unidadeId_idx" ON "public"."pld"("unidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "pld_dataHora_codigoSubmercado_tipo_key" ON "public"."pld"("dataHora", "codigoSubmercado", "tipo");

-- AddForeignKey
ALTER TABLE "public"."pld" ADD CONSTRAINT "pld_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "public"."unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
