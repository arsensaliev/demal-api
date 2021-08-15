import { Model } from 'objection';

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

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}

module.exports = UserModel;
export default UserModel;
