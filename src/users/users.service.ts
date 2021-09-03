import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from 'src/data/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InsertUserImageDto } from './dto/insert-user-image.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { TokenPayload } from './interfaces/token-payload.interface';
import fs from 'fs/promises';
import path from 'path';
import { AddWishlistTourDto } from './dto/add-wishlist-tour.dto';
import { Tour } from 'src/tours/entities/tour.entity';
import { ToursRepository } from 'src/data/repositories/tours.repository';
import { FileStorageService } from 'src/file-storage/file-storage.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly toursRepository: ToursRepository,
    private readonly authService: AuthService,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async register(payload: CreateUserDto) {
    let user: User = await this.usersRepository.findByEmail(payload.email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.authService.hashPassword(
      payload.password,
    );
    user = await this.usersRepository.insertAndFetch({
      ...payload,
      password: hashedPassword,
    });
    const tokenPayload = this.getTokenPayloadFromUser(user);
    const token = this.authService.generateAuthToken(tokenPayload);

    return {
      auth: {
        token,
      },
      user,
    };
  }

  async login(payload: LoginUserDto) {
    const user = await this.usersRepository.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      user.password,
      payload.password,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const tokenPayload = this.getTokenPayloadFromUser(user);
    const token = this.authService.generateAuthToken(tokenPayload);

    return {
      auth: {
        token,
      },
      user,
    };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.detailById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.updateAndFetchById(id, payload);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    const rowsDeleted = await this.usersRepository.deleteById(id);
    if (!rowsDeleted) {
      throw new NotFoundException('User not found');
    }
  }

  private getTokenPayloadFromUser(user: User): TokenPayload {
    return {
      id: user.id,
      isAdmin: false,
    };
  }

  async uploadImage(userId: number, imagePath: string): Promise<User> {
    let user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.imagePath) {
      await this.fileStorageService.deleteFile(user.imagePath);
    }

    const filePath = await this.fileStorageService.uploadImage(imagePath);

    user = await this.usersRepository.setUserImage(userId, {
      imagePath: filePath,
    });

    return user;
  }

  async deleteFile(filePath: string) {
    const dirnameToRoot = process.cwd();
    return await fs.unlink(path.join(dirnameToRoot, filePath));
  }

  async findWishlistTours(id: number): Promise<Tour[]> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tours = await this.usersRepository.findWishlistToursByUserId(user.id);
    return tours;
  }

  async addWishlistTour(
    userId: number,
    payload: AddWishlistTourDto,
  ): Promise<Tour> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tour = await this.toursRepository.findById(payload.tourId);
    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    const isExist = await this.usersRepository.findTourInWishlist(
      user.id,
      payload.tourId,
    );

    if (isExist) {
      throw new ConflictException('Tour is exist in wishlist');
    }

    await this.usersRepository.relateTourToWishlist(user.id, tour.id);

    return tour;
  }

  async removeWishlistTour(userId: number, tourId: number): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tour = await this.usersRepository.findTourInWishlist(user.id, tourId);
    if (!tour) {
      throw new NotFoundException('Tour not found in wishlist');
    }

    await this.usersRepository.unrelateTourFromWishlist(userId, tourId);
  }
}
