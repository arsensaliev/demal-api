import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  country: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  city: string;
}
