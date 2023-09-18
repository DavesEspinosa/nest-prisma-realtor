import { Injectable, Inject } from '@nestjs/common';
import { IHomeService } from '../../domain/repository/home.repository';
import { CreateHomeDto } from './dto/createHome.dto';

@Injectable()
export class CreateHomeUseCase {
  constructor(
    @Inject('HomeRepository') private readonly homeService: IHomeService,
  ) {}

  execute(body: CreateHomeDto, userId: number): Promise<unknown> {
    return this.homeService.createHome(body, userId);
  }
}
