import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/data/repositories/categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  create(payload: CreateCategoryDto) {
    return this.categoriesRepository.insertAndFetch(payload);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  findOne(id: number) {
    return this.categoriesRepository.findById(id);
  }

  update(id: number, payload: UpdateCategoryDto) {
    return this.categoriesRepository.updateAndFetchById(id, payload);
  }

  remove(id: number) {
    return this.categoriesRepository.deleteById(id);
  }
}
