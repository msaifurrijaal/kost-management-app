import { PrismaClient } from '@prisma/client';
import { seedRoles } from './role.seed';
import { seedStatuses } from './status.seed';
import { seedProvince } from './province.seed';
import { seedCity } from './city.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  await seedRoles(prisma);
  await seedStatuses(prisma);
  await seedProvince(prisma);
  await seedCity(prisma);

  console.log('✅ Seeding finished.');
}

main()
  .catch((error) => {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
