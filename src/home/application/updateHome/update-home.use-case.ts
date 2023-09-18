import { Injectable, Inject } from '@nestjs/common';
import { IHomeService } from '../../domain/repository/home.repository';
import { UpdateHomeDto } from './dto/updateHome.dto';

@Injectable()
export class UpdateHomeUseCase {
  constructor(
    @Inject('HomeRepository') private readonly homeService: IHomeService,
  ) {}

  execute(body: UpdateHomeDto, userId: number): Promise<unknown> {
    return this.homeService.updateHome(body, userId);
  }
}
