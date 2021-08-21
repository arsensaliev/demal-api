import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsPositive } from 'class-validator';

export class AddWishlistTourDto {
  @ApiProperty()
  @IsPositive()
  @IsDefined()
  tourId: number;
}
