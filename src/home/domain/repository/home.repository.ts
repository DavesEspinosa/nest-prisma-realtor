import { UserInfo } from 'src/decorators/user.decorator';
import { GetHomesParam, UpdateHomeParam } from '../../types';
import { HomeResponse } from 'src/home/domain/models/homeResponse.entity';
import { CreateHomeDto } from '../../application/createHome/dto/createHome.dto';

export interface IHomeService {
  getHomes(filters: GetHomesParam): Promise<Array<HomeResponse>>;
  getHome(id: number): Promise<HomeResponse>;
  createHome(body: CreateHomeDto, userId: number): Promise<unknown>;
  updateHome(data: UpdateHomeParam, id: number): Promise<HomeResponse>;
  deleteHome(id: number): Promise<void>;
  inquire(buyer: UserInfo, homeId: number, message: string): Promise<unknown>;
  getHomeMessages(homeId: number): Promise<unknown>;
  getRealtorByHomeId(id: number);
}
