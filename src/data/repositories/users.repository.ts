import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import UserModel from '../models/user.model';

@Injectable()
export class UsersRepository {
  findAll(): Promise<User[]> {
    return UserModel.query().select('id', 'firstName', 'lastName', 'email');
  }

  insertAndFetch(payload: CreateUserDto): Promise<User> {
    return UserModel.query().insertAndFetch(payload);
  }

  findById(id: number): Promise<User> {
    return UserModel.query().findById(id);
  }

  findByEmail(email: string): Promise<User> {
    return UserModel.query().findOne({ email });
  }

  updateAndFetchById(id: number, payload: UpdateUserDto): Promise<User> {
    return UserModel.query().patchAndFetchById(id, payload);
  }

  deleteById(id: number): Promise<number> {
    return UserModel.query().deleteById(id);
  }
}
