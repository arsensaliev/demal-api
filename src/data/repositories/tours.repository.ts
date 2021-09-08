import { Injectable } from '@nestjs/common';
import { Tour } from 'src/tours/entities/tour.entity';
import { UpdateTourDto } from 'src/tours/dto/update-tour.dto';
import { CreateTourDto } from 'src/tours/dto/create-tour.dto';
import { TourImage } from 'src/tours/entities/tour-image.entity';
import TourModel from '../models/tour.model';
import { InsertTourImageDto } from 'src/data/dto/insert-tour-image.dto';
import TourImageModel from '../models/tour-image.model';
import { ToursFindAllDto } from '../dto/tours-find-all.dto';

@Injectable()
export class ToursRepository {
  async findAll(payload: ToursFindAllDto): Promise<Tour[]> {
    const { sortBy, order, categoryId } = payload;

    let query: any = TourModel.query()
      .orderBy(sortBy, order)
      .withGraphFetched({ images: true, category: true });

    if (categoryId >= 0) {
      query = await this.addCategoryQuery(query, categoryId);
    }

    const tours: Tour[] = await query;

    return tours;
  }

  insertAndFetch(payload: CreateTourDto): Promise<Tour> {
    return TourModel.query().insertAndFetch(payload);
  }

  findById(id: number): Promise<Tour> {
    return TourModel.query().findById(id);
  }

  detailById(id: number): Promise<Tour> {
    return TourModel.query().findById(id).withGraphFetched({
      category: true,
      images: true,
    });
  }

  updateAndFetchById(id: number, payload: UpdateTourDto): Promise<Tour> {
    return TourModel.query().patchAndFetchById(id, payload);
  }

  deleteById(id: number): Promise<number> {
    return TourModel.query().deleteById(id);
  }

  insertImage(id: number, payload: InsertTourImageDto): Promise<TourImage> {
    return TourModel.relatedQuery('images').for(id).insertAndFetch(payload);
  }

  findImageById(imageId: number): Promise<TourImage> {
    return TourImageModel.query().findById(imageId);
  }

  deleteImageById(imageId: number): Promise<number> {
    return TourImageModel.query().deleteById(imageId);
  }

  private async addCategoryQuery(query: any, categoryId: number) {
    return query.where((builder: any) =>
      builder.where('categoryId', '=', categoryId),
    );
  }
}
