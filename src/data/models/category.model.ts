import { Model } from 'objection';
import TourModel from './tour.model';

class CategoryModel extends Model {
  static tableName = 'categories';

  id: number;
  name: string;
  iconPath: string;
  createdAt: string;
  tours?: TourModel[];

  static get relationMappings() {
    const TourModel = require('./tour.model');

    return {
      tours: {
        relation: Model.HasManyRelation,
        modelClass: TourModel,
        join: {
          from: 'categories.id',
          to: 'tours.categoryId',
        },
      },
    };
  }
}

module.exports = CategoryModel;
export default CategoryModel;
