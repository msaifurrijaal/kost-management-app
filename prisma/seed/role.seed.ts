import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient) {
  const roles = [
    { name: 'Owner', code: 'OWNER' },
    { name: 'Tenant', code: 'TENANT' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: role,
    });
  }

  console.log('✅ Roles seeded');
}
