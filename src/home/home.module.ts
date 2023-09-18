import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HomeController } from './infrastructure/controller/home.controller';
import { CreateHomeUseCase } from './application/createHome/create-home.use-case';
import { HomeService } from './infrastructure/service/home.service';
import { GetAllHomesUseCase } from './application/getAllHomes/getAll-homes.use-case';
import { UpdateHomeUseCase } from './application/updateHome/update-home.use-case';
import { GetRealtorUseCase } from './application/getRealtorById/get-realtor.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [HomeController],
  providers: [
    CreateHomeUseCase,
    GetAllHomesUseCase,
    UpdateHomeUseCase,
    GetRealtorUseCase,
    HomeService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: 'HomeRepository',
      useClass: HomeService,
    },
  ],
})
export class HomeModule {}
