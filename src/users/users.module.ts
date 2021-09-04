import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';
import { AuthModule } from 'src/auth/auth.module';
import { FileStorageModule } from 'src/file-storage/file-storage.module';

@Module({
  imports: [RepositoriesModule, AuthModule, FileStorageModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
