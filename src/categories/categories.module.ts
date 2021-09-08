import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';
import { CategoriesRepository } from 'src/data/repositories/categories.repository';

@Module({
  imports: [RepositoriesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
