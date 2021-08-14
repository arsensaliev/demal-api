import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
