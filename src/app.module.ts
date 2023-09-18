import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthController } from './user/auth/adapters/primary/auth.controller';
import { PrismaService } from './prisma/prisma.service';
import { HomeModule } from './home/home.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './interceptors/user.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './user/auth/adapters/secondary/auth.service';

@Module({
  imports: [UserModule, HomeModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
