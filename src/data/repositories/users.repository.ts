import { Injectable } from '@nestjs/common';
import { Tour } from 'src/tours/entities/tour.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InsertUserImageDto } from 'src/users/dto/insert-user-image.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import UserModel from '../models/user.model';

@Injectable()
export class UsersRepository {
  findAll(): Promise<User[]> {
    return UserModel.query();
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

  setUserImage(id: number, payload: InsertUserImageDto): Promise<User> {
    return UserModel.query().patchAndFetchById(id, {
      imagePath: payload.imagePath,
    });
  }

  deleteById(id: number): Promise<number> {
    return UserModel.query().deleteById(id);
  }

  relateTourToWishlist(userId: number, tourId: number): Promise<number> {
    return UserModel.relatedQuery('wishlist').for(userId).relate(tourId);
  }

  unrelateTourFromWishlist(userId: number, tourId: number): Promise<number> {
    return UserModel.relatedQuery('wishlist')
      .for(userId)
      .unrelate()
      .where({ tourId });
  }

  async findTourInWishlist(userId: number, tourId: number): Promise<Tour> {
    const user = await UserModel.query().findById(userId);
    if (!user) return;

    return user.$relatedQuery('wishlist').findById(tourId);
  }

  async findWishlistToursByUserId(id: number): Promise<Tour[]> {
    const user = await UserModel.query().findById(id);
    if (!user) return;

    return user.$relatedQuery('wishlist').withGraphFetched({
      category: true,
      images: true,
    });
  }
}
