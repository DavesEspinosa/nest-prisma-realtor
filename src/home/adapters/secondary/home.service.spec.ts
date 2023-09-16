import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyTpe } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockGetHomes = [
  {
    id: 1,
    address: '123 Main St',
    city: 'New York',
    price: 100000,
    propertyType: PropertyTpe.CONDO,
    number_of_bathrooms: 2,
    number_of_bedrooms: 3,
    images: [
      {
        url: 'https://example.com/image1.jpg',
      },
    ],
  },
];

const mockHome = {
  id: 1,
  address: '123 Main St',
  city: 'New York',
  price: 100000,
  propertyType: PropertyTpe.CONDO,
  number_of_bathrooms: 2,
  number_of_bedrooms: 3,
  image: '4',
};
const mockImages = [
  {
    id: 1,
    url: 'https://example.com/image1.jpg',
  },
];

describe('HomeService', () => {
  let service: HomeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockReturnValue(mockGetHomes),
              create: jest.fn().mockReturnValue(mockHome),
            },
            image: {
              createMany: jest.fn().mockReturnValue(mockImages),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHomes', () => {
    const filters = {
      city: 'New York',
      price: {
        gte: 50000,
        lte: 150000,
      },
      propertyTpe: PropertyTpe.CONDO,
    };
    it('should return an array of HomeResponseDto objects when given valid filters', async () => {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue(mockGetHomes);
      jest
        .spyOn(prismaService.home, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes);

      await service.getHomes(filters);
      expect(mockPrismaFindManyHomes).toBeCalledWith({
        select: {
          id: true,
          address: true,
          city: true,
          price: true,
          propertyType: true,
          number_of_bathrooms: true,
          number_of_bedrooms: true,
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
        where: filters,
      });
    });

    it('should throw a NotFoundException when no homes match the given filters', async () => {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue([]);
      jest
        .spyOn(prismaService.home, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes);

      await expect(service.getHomes(filters)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createHome', () => {
    const mockCreateHomeParams = {
      address: '123 Main St',
      numberOfBedrooms: 2,
      numberOfBathrooms: 3,
      city: 'New York',
      landSize: 1000,
      propertyType: PropertyTpe.CONDO,
      price: 500000,
      images: [
        {
          url: 'https://example.com/image1.jpg',
        },
      ],
    };

    it('should create a new home with valid input data and return a HomeResponseDto object', async () => {
      const mockCreateHome = jest.fn().mockReturnValue(mockHome);
      jest
        .spyOn(prismaService.home, 'create')
        .mockImplementation(mockCreateHome);

      await service.createHome(mockCreateHomeParams, 5);
      expect(mockCreateHome).toBeCalledWith({
        data: {
          address: '123 Main St',
          number_of_bathrooms: 3,
          number_of_bedrooms: 2,
          city: 'New York',
          land_size: 1000,
          propertyType: PropertyTpe.CONDO,
          price: 500000,
          realtor_id: 5,
        },
      });
    });

    it('should createMany a new home with valid input data and return a HomeResponseDto object', async () => {
      const mockCreateManyImage = jest.fn().mockReturnValue(mockImages);
      jest
        .spyOn(prismaService.image, 'createMany')
        .mockImplementation(mockCreateManyImage);

      await service.createHome(mockCreateHomeParams, 5);
      expect(mockCreateManyImage).toBeCalledWith({
        data: [
          {
            home_id: 1,
            url: 'https://example.com/image1.jpg',
          },
        ],
      });
    });
  });
});
