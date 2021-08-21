import { Model } from 'objection';
import Tour from './tour.model';

class UserModel extends Model {
  static tableName = 'users';

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

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static get relationMappings() {
    const Tour = require('./tour.model');

    return {
      wishlist: {
        relation: Model.ManyToManyRelation,
        modelClass: Tour,
        join: {
          from: 'users.id',
          through: {
            from: 'wishlist_tours.userId',
            to: 'wishlist_tours.tourId',
          },
          to: 'tours.id',
        },
      },
    };
  }
}
module.exports = UserModel;
export default UserModel;
