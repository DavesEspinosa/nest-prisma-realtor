import { PropertyTpe } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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
