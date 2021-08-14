import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateTourDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @IsOptional()
  price: number;

  @ApiPropertyOptional()
  @IsDefined()
  @IsInt()
  @IsOptional()
  categoryId: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  subTitle: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  place: string;

  @ApiPropertyOptional()
  @IsDefined()
  @IsInt()
  @IsPositive()
  @IsOptional()
  duration: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  country: string;

  @ApiPropertyOptional()
  @IsDefined()
  @IsInt()
  @IsPositive()
  @IsOptional()
  travelersCount: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  startDate: Date;
}
