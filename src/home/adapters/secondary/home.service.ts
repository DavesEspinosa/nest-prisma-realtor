import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/decorators/user.decorator';
import { IHomeService } from 'src/home/ports/home.port';
import { HomeResponseDto } from 'src/home/domains/homeResponse.entity';
import { HomeRepository } from 'src/home/repositories/home.repository';
import {
  GetHomesParam,
  CreateHomeParam,
  UpdateHomeParam,
} from 'src/home/types';

@Injectable()
export class HomeService implements IHomeService {
  constructor(private readonly homeRepository: HomeRepository) {}
  async getHomes(filters: GetHomesParam): Promise<Array<HomeResponseDto>> {
    return this.homeRepository.getAllHomes(filters);
  }

  async getHome(id: number): Promise<HomeResponseDto> {
    return this.homeRepository.getHomeById(id);
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
  ): Promise<HomeResponseDto> {
    return this.homeRepository.saveHome(
      {
        address,
        numberOfBathrooms,
        numberOfBedrooms,
        city,
        landSize,
        propertyType,
        price,
        images,
      },
      userId,
    );
  }
  async updateHome(
    data: UpdateHomeParam,
    id: number,
  ): Promise<HomeResponseDto> {
    return this.homeRepository.putHome(data, id);
  }
  async deleteHome(id: number): Promise<void> {
    return this.homeRepository.deleteHome(id);
  }

  async inquire(buyer: UserInfo, homeId: number, message: string) {
    return this.homeRepository.saveInquire(buyer, homeId, message);
  }

  getHomeMessages(homeId: number) {
    return this.homeRepository.getHomeMessages(homeId);
  }

  async getRealtorByHomeId(id: number) {
    return this.homeRepository.getRealtorByHomeId(id);
  }
}
