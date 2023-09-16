import { PropertyTpe } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class HomeResponseDto {
  @IsString()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsInt()
  @IsNotEmpty()
  @Exclude()
  number_of_bedrooms: number;
  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }
  @IsInt()
  @IsNotEmpty()
  @Exclude()
  number_of_bathrooms: number;
  @Expose({ name: 'numberOfBathrooms' })
  numberOfBathrooms() {
    return this.number_of_bathrooms;
  }
  @IsString()
  @IsNotEmpty()
  city: string;
  @Exclude()
  listed_date: Date;
  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }
  @IsInt()
  @IsNotEmpty()
  price: number;

  image: string;
  @IsInt()
  @IsNotEmpty()
  @Exclude()
  land_size: number;
  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }
  @IsEnum(PropertyTpe)
  @IsNotEmpty()
  propertyType: PropertyTpe;
  @Exclude()
  realtor_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}
