import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';
import { UploadsController } from './uploads.controller';

@Module({
  imports: [RepositoriesModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
