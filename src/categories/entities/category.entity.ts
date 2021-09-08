import { Tour } from 'src/tours/entities/tour.entity';

export class Category {
  id: number;
  name: string;
  iconPath: string;
  createdAt: string;
  tours?: Tour[];
}
