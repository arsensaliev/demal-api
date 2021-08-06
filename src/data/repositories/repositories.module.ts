import { Module } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersRepository, AdminsRepository],
  exports: [UsersRepository, AdminsRepository],
})
export class RepositoriesModule {}
