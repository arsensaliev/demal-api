import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
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

export class CreateTourDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsDefined()
  @IsInt()
  categoryId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  subTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  place: string;

  @ApiProperty()
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  country: string;

  @ApiProperty()
  @IsDefined()
  @IsInt()
  @IsPositive()
  travelersCount: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;
}
