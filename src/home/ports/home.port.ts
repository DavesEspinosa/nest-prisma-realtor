import { UserInfo } from 'src/decorators/user.decorator';
import { HomeResponseDto } from '../domains/homeResponse.entity';
import { GetHomesParam, CreateHomeParam, UpdateHomeParam } from '../types';

export interface IHomeService {
  getHomes(filters: GetHomesParam): Promise<Array<HomeResponseDto>>;
  getHome(id: number): Promise<HomeResponseDto>;
  createHome(
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
  ): Promise<HomeResponseDto>;
  updateHome(data: UpdateHomeParam, id: number): Promise<HomeResponseDto>;
  deleteHome(id: number): Promise<void>;
  inquire(buyer: UserInfo, homeId: number, message: string);
  getHomeMessages(homeId: number);
  getRealtorByHomeId(id: number);
}
