import { Model } from 'objection';

class AdminModel extends Model {
  static tableName = 'admins';

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
}

module.exports = AdminModel;
export default AdminModel;
