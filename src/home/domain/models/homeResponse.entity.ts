import { PropertyTpe } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class HomeResponse {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @Exclude()
  number_of_bedrooms: number;
  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }
  @IsNumber()
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
  @IsNumber()
  @IsNotEmpty()
  price: number;

  image: string;
  @IsNumber()
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

  constructor(partial: Partial<HomeResponse>) {
    Object.assign(this, partial);
  }
}
