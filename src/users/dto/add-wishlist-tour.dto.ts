import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class AddWishlistTourDto {
  @ApiProperty()
  @IsInt()
  @IsDefined()
  tourId: number;
}
