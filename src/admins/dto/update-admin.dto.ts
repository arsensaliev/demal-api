import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class UpdateAdminDto {
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
  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  @IsOptional()
  password: string;
}
