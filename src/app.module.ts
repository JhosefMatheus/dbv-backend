import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UnityModule } from './unity/unity.module';
import { FunctionalityModule } from './functionality/functionality.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UnityModule,
    FunctionalityModule
  ],
})
export class AppModule { }
