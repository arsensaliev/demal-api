import { Model } from 'objection';
import CategoryModel from './category.model';
import TourImageModel from './tour-image.model';

class TourModel extends Model {
  static tableName = 'tours';

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
  category: CategoryModel;
  images?: TourImageModel[];
  createdAt: string;

  static get relationMappings() {
    const Category = require('./category.model');
    const TourImage = require('./tour-image.model');

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'tours.categoryId',
          to: 'categories.id',
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: TourImage,
        join: {
          from: 'tours.id',
          to: 'tour_images.tourId',
        },
      },
    };
  }
}

module.exports = TourModel;
export default TourModel;
