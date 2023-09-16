import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HomeRepository } from './repositories/home.repository';
import { HomeController } from './adapters/primary/home.controller';
import { HomeService } from './adapters/secondary/home.service';

@Module({
  imports: [PrismaModule],
  controllers: [HomeController],
  providers: [
    HomeService,
    HomeRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class HomeModule {}
