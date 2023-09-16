import { PropertyTpe } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

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

class Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsNumber()
  @IsPositive()
  numberOfBedrooms: number;
  @IsInt()
  @IsNotEmpty()
  numberOfBathrooms: number;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumber()
  @IsPositive()
  landSize: number;
  @IsEnum(PropertyTpe)
  @IsNotEmpty()
  propertyType: PropertyTpe;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];
}

export class UpdateHomeDto {
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  city: string;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  numberOfBedrooms: number;
  @IsOptional()
  @IsInt()
  numberOfBathrooms: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  landSize: number;
  @IsOptional()
  @IsEnum(PropertyTpe)
  propertyType: PropertyTpe;
}

export class InquireDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
