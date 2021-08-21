import { Tour } from 'src/tours/entities/tour.entity';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  country: string;
  city: string;
  email: string;
  imagePath: string;
  createdAt: string;
  wishlist?: Tour[];
}
