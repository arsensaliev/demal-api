import { Module } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';
import { CategoriesRepository } from './categories.repository';
import { ToursRepository } from './tours.repository';
import { UsersRepository } from './users.repository';

@Module({
  providers: [
    UsersRepository,
    AdminsRepository,
    ToursRepository,
    CategoriesRepository,
  ],
  exports: [
    UsersRepository,
    AdminsRepository,
    ToursRepository,
    CategoriesRepository,
  ],
})
export class RepositoriesModule {}
