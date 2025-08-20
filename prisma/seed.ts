import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar regiões
  const regioes = [
    { sigla: 'N', nome: 'Norte' },
    { sigla: 'NE', nome: 'Nordeste' },
    { sigla: 'SE', nome: 'Sudeste' },
    { sigla: 'S', nome: 'Sul' },
    { sigla: 'CO', nome: 'Centro-Oeste' },
  ];

  console.log('📍 Criando regiões...');
  for (const regiao of regioes) {
    await prisma.regiao.upsert({
      where: { sigla: regiao.sigla },
      update: {},
      create: regiao,
    });
  }

  // Buscar regiões criadas
  const regiaoNorte = await prisma.regiao.findUnique({ where: { sigla: 'N' } });
  const regiaoNordeste = await prisma.regiao.findUnique({
    where: { sigla: 'NE' },
  });
  const regiaoSudeste = await prisma.regiao.findUnique({
    where: { sigla: 'SE' },
  });
  const regiaoSul = await prisma.regiao.findUnique({ where: { sigla: 'S' } });
  const regiaoCentroOeste = await prisma.regiao.findUnique({
    where: { sigla: 'CO' },
  });

  // Criar estados
  const estados = [
    // Norte
    { sigla: 'AC', nome: 'Acre', regiaoId: regiaoNorte!.id },
    { sigla: 'AP', nome: 'Amapá', regiaoId: regiaoNorte!.id },
    { sigla: 'AM', nome: 'Amazonas', regiaoId: regiaoNorte!.id },
    { sigla: 'PA', nome: 'Pará', regiaoId: regiaoNorte!.id },
    { sigla: 'RO', nome: 'Rondônia', regiaoId: regiaoNorte!.id },
    { sigla: 'RR', nome: 'Roraima', regiaoId: regiaoNorte!.id },
    { sigla: 'TO', nome: 'Tocantins', regiaoId: regiaoNorte!.id },

    // Nordeste
    { sigla: 'AL', nome: 'Alagoas', regiaoId: regiaoNordeste!.id },
    { sigla: 'BA', nome: 'Bahia', regiaoId: regiaoNordeste!.id },
    { sigla: 'CE', nome: 'Ceará', regiaoId: regiaoNordeste!.id },
    { sigla: 'MA', nome: 'Maranhão', regiaoId: regiaoNordeste!.id },
    { sigla: 'PB', nome: 'Paraíba', regiaoId: regiaoNordeste!.id },
    { sigla: 'PE', nome: 'Pernambuco', regiaoId: regiaoNordeste!.id },
    { sigla: 'PI', nome: 'Piauí', regiaoId: regiaoNordeste!.id },
    { sigla: 'RN', nome: 'Rio Grande do Norte', regiaoId: regiaoNordeste!.id },
    { sigla: 'SE', nome: 'Sergipe', regiaoId: regiaoNordeste!.id },

    // Sudeste
    { sigla: 'ES', nome: 'Espírito Santo', regiaoId: regiaoSudeste!.id },
    { sigla: 'MG', nome: 'Minas Gerais', regiaoId: regiaoSudeste!.id },
    { sigla: 'RJ', nome: 'Rio de Janeiro', regiaoId: regiaoSudeste!.id },
    { sigla: 'SP', nome: 'São Paulo', regiaoId: regiaoSudeste!.id },

    // Sul
    { sigla: 'PR', nome: 'Paraná', regiaoId: regiaoSul!.id },
    { sigla: 'RS', nome: 'Rio Grande do Sul', regiaoId: regiaoSul!.id },
    { sigla: 'SC', nome: 'Santa Catarina', regiaoId: regiaoSul!.id },

    // Centro-Oeste
    { sigla: 'DF', nome: 'Distrito Federal', regiaoId: regiaoCentroOeste!.id },
    { sigla: 'GO', nome: 'Goiás', regiaoId: regiaoCentroOeste!.id },
    { sigla: 'MT', nome: 'Mato Grosso', regiaoId: regiaoCentroOeste!.id },
    {
      sigla: 'MS',
      nome: 'Mato Grosso do Sul',
      regiaoId: regiaoCentroOeste!.id,
    },
  ];

  console.log('🏛️ Criando estados...');
  for (const estado of estados) {
    await prisma.estado.upsert({
      where: { sigla: estado.sigla },
      update: {},
      create: estado,
    });
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📍 ${regioes.length} regiões criadas`);
  console.log(`🏛️ ${estados.length} estados criados`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
