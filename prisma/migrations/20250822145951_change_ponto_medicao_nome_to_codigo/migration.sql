/*
  Warnings:

  - You are about to drop the column `nome` on the `pontos_de_medicao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo]` on the table `pontos_de_medicao` will be added. If there are existing duplicate values, this will fail.
*/

-- AlterTable
-- Primeiro adicionar a nova coluna codigo
ALTER TABLE "public"."pontos_de_medicao" ADD COLUMN "codigo" TEXT;

-- Copiar os dados do campo nome para o campo codigo
UPDATE "public"."pontos_de_medicao" SET "codigo" = "nome";

-- Tornar a coluna codigo NOT NULL
ALTER TABLE "public"."pontos_de_medicao" ALTER COLUMN "codigo" SET NOT NULL;

-- Adicionar a constraint única
CREATE UNIQUE INDEX "pontos_de_medicao_codigo_key" ON "public"."pontos_de_medicao"("codigo");

-- Remover a coluna nome
ALTER TABLE "public"."pontos_de_medicao" DROP COLUMN "nome";
