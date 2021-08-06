import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { RepositoriesModule } from 'src/data/repositories/repositories.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
