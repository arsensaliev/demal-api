import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admins/entities/admin.entity';
import AdminModel from 'src/data/models/admin.model';
import { CreateAdminDto } from '../../admins/dto/create-admin.dto';
import { UpdateAdminDto } from '../../admins/dto/update-admin.dto';

@Injectable()
export class AdminsRepository {
  getAdmins(): Promise<Admin[]> {
    return AdminModel.query();
  }

  insertAndFetch(payload: CreateAdminDto): Promise<Admin> {
    return AdminModel.query().insertAndFetch(payload);
  }

  findById(id: number): Promise<Admin> {
    return AdminModel.query().findById(id);
  }

  findByEmail(email: string): Promise<Admin> {
    return AdminModel.query().findOne({ email });
  }

  updateAndFetchById(id: number, payload: UpdateAdminDto): Promise<Admin> {
    return AdminModel.query().patchAndFetchById(id, payload);
  }

  deleteById(id: number): Promise<number> {
    return AdminModel.query().deleteById(id);
  }
}
