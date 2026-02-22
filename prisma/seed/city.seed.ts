import { PrismaClient } from '@prisma/client';

export async function seedCity(prisma: PrismaClient) {
  const cities = [
    { name: 'Malang', provinceName: 'Jawa Timur' },
    { name: 'Surabaya', provinceName: 'Jawa Timur' },
    { name: 'Solo', provinceName: 'Jawa Tengah' },
  ];

  for (const city of cities) {
    const province = await prisma.province.findFirst({
      where: { name: city.provinceName },
    });

    if (!province) {
      console.log(`Province not found: ${city.provinceName}`);
      continue;
    }

    const existing = await prisma.city.findFirst({
      where: {
        name: city.name,
        provinceId: province.id,
      },
    });

    if (!existing) {
      await prisma.city.create({
        data: {
          name: city.name,
          provinceId: province.id,
        },
      });
    }
  }

  console.log('✅ Cities seeded');
}
