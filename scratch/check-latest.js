const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const records = await prisma.formData.findMany({
      take: 5,
      orderBy: { id: 'desc' }
    });
    console.log('LATEST_IDS:', records.map(r => r.id));
    if (records.length > 0) {
      console.log('DETAILS_OF_LATEST:', records[0].name, records[0].id);
    }
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
