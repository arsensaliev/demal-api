import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [RepositoriesModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
