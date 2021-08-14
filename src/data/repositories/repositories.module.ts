import { Module } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';
import { ToursRepository } from './tours.repository';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersRepository, AdminsRepository, ToursRepository],
  exports: [UsersRepository, AdminsRepository, ToursRepository],
})
export class RepositoriesModule {}
