import { PropertyTpe } from '@prisma/client';

export interface GetHomesParam {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  propertyTpe?: PropertyTpe;
}

export interface CreateHomeParam {
  address: string;
  city: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  price: number;
  landSize: number;
  propertyType: PropertyTpe;
  images: { url: string }[];
}
export interface UpdateHomeParam {
  address?: string;
  city?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  price?: number;
  landSize?: number;
  propertyType?: PropertyTpe;
}
