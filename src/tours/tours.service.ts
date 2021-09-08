import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertTourImageDto } from 'src/data/dto/insert-tour-image.dto';
import { ToursRepository } from 'src/data/repositories/tours.repository';
import { CreateTourDto } from './dto/create-tour.dto';
import { FindToursDto } from './dto/find-tours.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Tour } from './entities/tour.entity';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { FileStorageService } from 'src/file-storage/file-storage.service';

@Injectable()
export class ToursService {
  constructor(
    private readonly toursRepository: ToursRepository,
    private readonly categoriesRepotsitory: ToursRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async create(payload: CreateTourDto): Promise<Tour> {
    const category = await this.categoriesRepotsitory.findById(
      payload.categoryId,
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const tour = await this.toursRepository.insertAndFetch(payload);

    return tour;
  }

  async findAll(payload: FindToursDto): Promise<Tour[]> {
    type Order = 'desc' | 'asc' | 'ASC' | 'DESC' | undefined;

    const DEFAULT_SORT_COLUMN = 'createdAt';
    const DEFAULT_ORDER = 'desc';

    const sortByQuery = payload.sortBy || DEFAULT_SORT_COLUMN;
    const orderQuery = (payload.order as Order) || DEFAULT_ORDER;
    const categoryIdQuery =
      payload.categoryId === null ? null : +payload.categoryId;

    const tours = await this.toursRepository.findAll({
      order: orderQuery,
      sortBy: sortByQuery,
      categoryId: categoryIdQuery,
    });

    return tours;
  }

  findOne(id: number): Promise<Tour> {
    return this.toursRepository.detailById(id);
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return this.toursRepository.updateAndFetchById(id, updateTourDto);
  }

  async remove(id: number): Promise<void> {
    const rowsDeleted = await this.toursRepository.deleteById(id);
    if (!rowsDeleted) {
      throw new NotFoundException('Tour not found');
    }
  }

  async uploadImage(
    id: number,
    images: Array<Express.Multer.File>,
  ): Promise<Tour> {
    let tour = await this.toursRepository.findById(id);

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    for (const image of images) {
      const imagePath = await this.fileStorageService.uploadImage(image.path);
      await this.toursRepository.insertImage(tour.id, { imagePath });
    }

    tour = await this.toursRepository.detailById(tour.id);

    return tour;
  }

  async removeImage(tourId: number, imageId: number): Promise<void> {
    const tour = await this.toursRepository.findById(tourId);

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    const image = await this.toursRepository.findImageById(imageId);

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    await this.toursRepository.deleteImageById(image.id);
    await this.deleteFile(image.imagePath);
  }

  async deleteFile(filePath: string) {
    const tempDir = os.tmpdir();

    return await fs.unlink(path.join(tempDir, filePath));
  }
}
