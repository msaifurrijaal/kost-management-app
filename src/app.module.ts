import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PropertyModule } from './property/property.module';
import { RoomsModule } from './rooms/rooms.module';
import { InventoriesModule } from './inventories/inventories.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PropertyModule,
    RoomsModule,
    InventoriesModule,
  ],
})
export class AppModule {}
