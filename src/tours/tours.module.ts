import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';
import { FileStorageModule } from 'src/file-storage/file-storage.module';

@Module({
  imports: [RepositoriesModule, FileStorageModule],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
