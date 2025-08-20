-- CreateTable
CREATE TABLE "public"."regioes" (
    "id" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regioes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estados" (
    "id" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "regiaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sub_unidades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "estadoId" TEXT,
    "regiaoId" TEXT,
    "apeRemoto" BOOLEAN,
    "apeLocal" BOOLEAN,
    "codigoI5" TEXT,
    "codigoI0" TEXT,
    "codigoI100" TEXT,
    "codigoConv" TEXT,
    "unidadeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_unidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."unidades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codigoCCEE" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "grupoEconomico" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pontos_de_medicao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "subUnidadeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pontos_de_medicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regioes_sigla_key" ON "public"."regioes"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "estados_sigla_key" ON "public"."estados"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_codigoCCEE_key" ON "public"."unidades"("codigoCCEE");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_cnpj_key" ON "public"."unidades"("cnpj");

-- AddForeignKey
ALTER TABLE "public"."estados" ADD CONSTRAINT "estados_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "public"."regioes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_unidades" ADD CONSTRAINT "sub_unidades_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "public"."estados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_unidades" ADD CONSTRAINT "sub_unidades_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "public"."regioes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sub_unidades" ADD CONSTRAINT "sub_unidades_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "public"."unidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pontos_de_medicao" ADD CONSTRAINT "pontos_de_medicao_subUnidadeId_fkey" FOREIGN KEY ("subUnidadeId") REFERENCES "public"."sub_unidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
