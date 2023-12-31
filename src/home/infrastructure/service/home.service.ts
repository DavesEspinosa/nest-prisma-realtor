import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfo } from 'src/decorators/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { IHomeService } from 'src/home/domain/repository/home.repository';
import { HomeResponse } from 'src/home/domain/models/homeResponse.entity';
import {
  CreateHomeParam,
  GetHomesParam,
  UpdateHomeParam,
} from 'src/home/types';

const homeSelect = {
  id: true,
  address: true,
  city: true,
  price: true,
  propertyType: true,
  number_of_bedrooms: true,
  number_of_bathrooms: true,
};
@Injectable()
export class HomeService implements IHomeService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHomes(filters: GetHomesParam): Promise<Array<HomeResponse>> {
    const homes = await this.prismaService.home.findMany({
      select: {
        ...homeSelect,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: filters,
    });
    if (!homes.length) {
      throw new NotFoundException();
    }
    return homes.map((home) => {
      if (!home.images) {
        const fetcHome = { ...home, image: home.images[0].url };
        return new HomeResponse(fetcHome);
      } else {
        return new HomeResponse(home);
      }
    });
  }

  async getHome(id: number): Promise<HomeResponse> {
    const home = await this.prismaService.home.findUnique({
      where: { id },
      select: {
        ...homeSelect,
        images: {
          select: {
            url: true,
          },
        },
        realtor: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    if (!home) {
      throw new NotFoundException();
    }
    return new HomeResponse(home);
  }

  async createHome(
    {
      address,
      numberOfBathrooms,
      numberOfBedrooms,
      city,
      landSize,
      propertyType,
      price,
      images,
    }: CreateHomeParam,
    userId: number,
  ) {
    const home = await this.prismaService.home.create({
      data: {
        address,
        number_of_bathrooms: numberOfBathrooms,
        number_of_bedrooms: numberOfBedrooms,
        city,
        land_size: landSize,
        propertyType,
        price,
        realtor_id: userId,
      },
    });

    const homeImages = images.map((image) => {
      return { ...image, home_id: home.id };
    });
    await this.prismaService.image.createMany({ data: homeImages });

    return new HomeResponse(home);
  }
  async updateHome(data: UpdateHomeParam, id: number) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });
    if (!home) {
      throw new NotFoundException();
    }

    const updatedHome = await this.prismaService.home.update({
      where: {
        id,
      },
      data: {
        ...(data.city && {
          city: data.city,
        }),
        ...(data.address && {
          address: data.address,
        }),
        ...(data.price && {
          price: data.price,
        }),
        ...(data.propertyType && {
          propertyType: data.propertyType,
        }),
        ...(data.numberOfBathrooms && {
          number_of_bathrooms: data.numberOfBathrooms,
        }),
        ...(data.numberOfBedrooms && {
          number_of_bedrooms: data.numberOfBedrooms,
        }),
        ...(data.landSize && { land_size: data.landSize }),
      },
    });

    return new HomeResponse(updatedHome);
  }
  async deleteHome(id: number) {
    await this.prismaService.image.deleteMany({
      where: {
        home_id: id,
      },
    });

    await this.prismaService.home.delete({
      where: {
        id,
      },
    });
  }

  async inquire(buyer: UserInfo, homeId: number, message: string) {
    const realtor = await this.getRealtorByHomeId(homeId);
    return await this.prismaService.message.create({
      data: {
        message,
        home_id: homeId,
        realtor_id: realtor.id,
        buyer_id: buyer.id,
      },
    });
  }

  getHomeMessages(homeId: number) {
    return this.prismaService.message.findMany({
      where: {
        home_id: homeId,
      },
      select: {
        message: true,
        buyer: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });
  }

  async getRealtorByHomeId(id: number) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
      select: {
        realtor: {
          select: {
            name: true,
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    if (!home) {
      throw new NotFoundException();
    }
    return home.realtor;
  }
}
