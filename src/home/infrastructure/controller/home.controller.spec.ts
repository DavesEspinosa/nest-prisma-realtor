import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyTpe } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import { UpdateHomeDto } from 'src/home/application/createHome/dto/updateHome.dto';
import { HomeService } from '../service/home.service';

const mockUser = {
  name: 'Laith',
  id: 30,
  phone: '(555) 555 5555',
  email: 'buyer@hotmail.com',
};
const mockHome = [
  {
    id: 1,
    address: '123 Main St',
    city: 'New York',
    price: 100000,
    propertyType: PropertyTpe.CONDO,
    number_of_bathrooms: 2,
    number_of_bedrooms: 3,
    image: '4',
  },
];

describe('HomeController', () => {
  let controller: HomeController;
  let homeService: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: {
            getHomes: jest.fn().mockReturnValue([]),
            getRealtorByHomeId: jest.fn().mockReturnValue(mockUser),
            updateHome: jest.fn().mockReturnValue(mockHome),
          },
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<HomeController>(HomeController);
    homeService = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHomes', () => {
    it('should construct filter object correctly', async () => {
      const mockGetHomes = jest.fn().mockReturnValue([]);
      jest.spyOn(homeService, 'getHomes').mockImplementation(mockGetHomes);
      await controller.getHomes('Toronto', '15000');

      expect(mockGetHomes).toBeCalledWith({
        city: 'Toronto',
        price: {
          gte: 15000,
        },
      });
    });
  });

  describe('updateHome', () => {
    const mockUserInfo = {
      name: 'Mick',
      id: 3,
      iat: 2342342344,
      exp: 34234,
    };
    const mockUpdateHomeParams: UpdateHomeDto = {
      address: 'Tetsing',
      city: 'Toronto',
      price: 500000,
      numberOfBedrooms: 2,
      numberOfBathrooms: 3,
      landSize: 1000,
      propertyType: PropertyTpe.CONDO,
    };
    it('should throw unauth if error did not create home', async () => {
      await expect(
        controller.updateHome(5, mockUpdateHomeParams, mockUserInfo),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should update home if realtor id is valid', async () => {
      const mockUpdateHome = jest.fn().mockReturnValue(mockHome);
      jest.spyOn(homeService, 'updateHome').mockImplementation(mockUpdateHome);
      await controller.updateHome(5, mockUpdateHomeParams, {
        ...mockUserInfo,
        id: 30,
      });

      expect(mockUpdateHome).toBeCalled();
    });
  });
});
