-- CreateTable
CREATE TABLE "public"."pld" (
    "id" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "submercado" TEXT NOT NULL,
    "codigoSubmercado" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "moeda" TEXT NOT NULL DEFAULT 'BRL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pld_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pld_dataHora_idx" ON "public"."pld"("dataHora");

-- CreateIndex
CREATE INDEX "pld_codigoSubmercado_idx" ON "public"."pld"("codigoSubmercado");

-- CreateIndex
CREATE UNIQUE INDEX "pld_dataHora_codigoSubmercado_key" ON "public"."pld"("dataHora", "codigoSubmercado");
