import { Injectable, Inject } from '@nestjs/common';
import { IHomeService } from '../../domain/repository/home.repository';
import { HomeResponse } from 'src/home/domain/models/homeResponse.entity';
import { GetHomesParam } from 'src/home/types';

@Injectable()
export class GetAllHomesUseCase {
  constructor(
    @Inject('HomeRepository') private readonly homeService: IHomeService,
  ) {}

  execute(filters: GetHomesParam): Promise<Array<HomeResponse>> {
    return this.homeService.getHomes(filters);
  }
}
