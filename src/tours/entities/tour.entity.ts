import CategoryModel from 'src/data/models/category.model';
import TourImageModel from 'src/data/models/tour-image.model';

export class Tour {
  id: number;
  title: string;
  subTitle: string;
  place: string;
  description: string;
  price: number;
  duration: number;
  country: string;
  travelersCount: number;
  startDate: Date;
  category?: CategoryModel;
  images?: TourImageModel[];
  createdAt: string;
}
