import { PrismaClient } from '@prisma/client';

export async function seedProvince(prisma: PrismaClient) {
  const provinces = [{ name: 'Jawa Timur' }, { name: 'Jawa Tengah' }];

  for (const province of provinces) {
    const existing = await prisma.province.findFirst({
      where: { name: province.name },
    });

    if (!existing) {
      await prisma.province.create({
        data: province,
      });
    }
  }

  console.log('✅ Provinces seeded');
}
