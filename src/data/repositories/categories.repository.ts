import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { Category } from 'src/categories/entities/category.entity';
import CategoryModel from '../models/category.model';

@Injectable()
export class CategoriesRepository {
  findAll(): Promise<Category[]> {
    return CategoryModel.query().orderBy('createdAt', 'desc');
  }

  insertAndFetch(payload: CreateCategoryDto): Promise<Category> {
    return CategoryModel.query().insertAndFetch(payload);
  }

  findById(id: number): Promise<Category> {
    return CategoryModel.query().findById(id);
  }

  findByName(name: string): Promise<Category> {
    return CategoryModel.query().findOne({ name });
  }

  updateAndFetchById(
    id: number,
    payload: UpdateCategoryDto,
  ): Promise<Category> {
    return CategoryModel.query().patchAndFetchById(id, payload);
  }

  deleteById(id: number): Promise<number> {
    return CategoryModel.query().deleteById(id);
  }
}
