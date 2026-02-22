import { PrismaClient } from '@prisma/client';

export async function seedStatuses(prisma: PrismaClient) {
  const statuses = [
    { name: 'Available', code: 'AVAILABLE' },
    { name: 'Occupied', code: 'OCCUPIED' },
    { name: 'Maintenance', code: 'MAINTENANCE' },
    { name: 'Paid', code: 'PAID' },
    { name: 'Unpaid', code: 'UNPAID' },
    { name: 'Late', code: 'LATE' },
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { code: status.code },
      update: {},
      create: status,
    });
  }

  console.log('✅ Statuses seeded');
}
