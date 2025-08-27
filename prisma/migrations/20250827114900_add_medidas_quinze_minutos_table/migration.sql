-- CreateTable
CREATE TABLE "public"."medidas_quinze_minutos" (
    "id" TEXT NOT NULL,
    "codigoPontoMedicao" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "unidade" TEXT,
    "pontoDeMedicaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medidas_quinze_minutos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "medidas_quinze_minutos_pontoDeMedicaoId_dataHora_idx" ON "public"."medidas_quinze_minutos"("pontoDeMedicaoId", "dataHora");

-- CreateIndex
CREATE UNIQUE INDEX "medidas_quinze_minutos_codigoPontoMedicao_dataHora_key" ON "public"."medidas_quinze_minutos"("codigoPontoMedicao", "dataHora");

-- AddForeignKey
ALTER TABLE "public"."medidas_quinze_minutos" ADD CONSTRAINT "medidas_quinze_minutos_pontoDeMedicaoId_fkey" FOREIGN KEY ("pontoDeMedicaoId") REFERENCES "public"."pontos_de_medicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
