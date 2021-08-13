import { Model } from 'objection';
import TourModel from './tour.model';

class TourImageModel extends Model {
  static tableName = 'tour_images';

  id: number;
  tourId: number;
  imagePath: string;
  createdAt: string;
  tour?: TourModel;

  static get relationMappings() {
    const Tour = require('./tour.model');

    return {
      tour: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tour,
        join: {
          from: 'tour_images.tourId',
          to: 'tours.id',
        },
      },
    };
  }
}

module.exports = TourImageModel;
export default TourImageModel;
