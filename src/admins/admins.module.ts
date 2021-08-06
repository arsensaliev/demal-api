import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminsRepository } from '../data/repositories/admins.repository';
import { AuthModule } from 'src/auth/auth.module';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';

@Module({
  imports: [AuthModule, RepositoriesModule],
  controllers: [AdminsController],
  providers: [AdminsService, AdminsRepository],
  exports: [AdminsRepository],
})
export class AdminsModule {}
