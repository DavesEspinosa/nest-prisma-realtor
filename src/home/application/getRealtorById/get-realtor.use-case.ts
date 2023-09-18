import { Injectable, Inject } from '@nestjs/common';
import { IHomeService } from '../../domain/repository/home.repository';

@Injectable()
export class GetRealtorUseCase {
  constructor(
    @Inject('HomeRepository') private readonly homeService: IHomeService,
  ) {}

  execute(id: number) {
    return this.homeService.getRealtorByHomeId(id);
  }
}
