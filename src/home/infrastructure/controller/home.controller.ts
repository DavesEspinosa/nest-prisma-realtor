import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

import { PropertyTpe, UserType } from '@prisma/client';
import { User, UserInfo } from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/roles.decorators';
import { CreateHomeDto } from 'src/home/application/createHome/dto/createHome.dto';
import { CreateHomeUseCase } from 'src/home/application/createHome/create-home.use-case';
import { HomeResponse } from 'src/home/domain/models/homeResponse.entity';
import { GetAllHomesUseCase } from 'src/home/application/getAllHomes/getAll-homes.use-case';
import { UpdateHomeDto } from 'src/home/application/updateHome/dto/updateHome.dto';
import { GetRealtorUseCase } from 'src/home/application/getRealtorById/get-realtor.use-case';
import { UpdateHomeUseCase } from 'src/home/application/updateHome/update-home.use-case';

@Controller('home')
export class HomeController {
  constructor(
    private readonly createHomeUseCase: CreateHomeUseCase,
    private readonly getAllHomesUseCase: GetAllHomesUseCase,
    private readonly getRealtorUseCase: GetRealtorUseCase,
    private readonly updateHomeUseCase: UpdateHomeUseCase,
  ) {}

  @Get()
  getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyTpe,
  ): Promise<Array<HomeResponse>> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && {
              gte: parseFloat(minPrice),
            }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;
    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { propertyType }),
    };
    return this.getAllHomesUseCase.execute(filters);
  }

  // @Get(':id')
  // getHome(@Param('id', ParseIntPipe) id: number): Promise<HomeResponse> {
  //   return this.homeService.getHome(id);
  // }

  @Roles(UserType.BUYER)
  @Post()
  async createHome(@Body() body: CreateHomeDto, @User() user: UserInfo) {
    return this.createHomeUseCase.execute(body, user.id);
  }

  @Roles(UserType.REALTOR)
  @Put(':id')
  async updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeDto,
    @User() user: UserInfo,
  ) {
    const realtor = await this.getRealtorUseCase.execute(id);
    if (realtor.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.updateHomeUseCase.execute(body, id);
  }

  // @Roles(UserType.REALTOR)
  // @Delete(':id')
  // async deleteHome(
  //   @Param('id', ParseIntPipe) id: number,
  //   @User() user: UserInfo,
  // ) {
  //   const realtor = await this.homeService.getRealtorByHomeId(id);
  //   if (realtor.id !== user?.id) {
  //     throw new UnauthorizedException();
  //   }

  //   return this.homeService.deleteHome(id);
  // }

  // @Roles(UserType.BUYER)
  // @Post(':id/inquire')
  // async inquireAbout(
  //   @Body() { message }: InquireDto,
  //   @Param('id', ParseIntPipe) homeId: number,
  //   @User() user: UserInfo,
  // ) {
  //   return this.homeService.inquire(user, homeId, message);
  // }

  // @Get(':id/messages')
  // async getHomeMessages(
  //   @Param('id', ParseIntPipe) homeId: number,
  //   @User() user: UserInfo,
  // ): Promise<Array<InquireDto>> {
  //   const realtor = await this.homeService.getRealtorByHomeId(homeId);
  //   if (realtor.id !== user?.id) {
  //     throw new UnauthorizedException();
  //   }

  //   return this.homeService.getHomeMessages(homeId);
  // }
}
