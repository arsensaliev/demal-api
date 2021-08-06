import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import config from 'src/config';
import { UserPayload } from './interfaces/user-payload';
import { UsersRepository } from 'src/data/repositories/users.repository';
import { AdminsRepository } from 'src/data/repositories/admins.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly adminsRepository: AdminsRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: UserPayload) {
    let response: any;

    if (payload.isAdmin) {
      response = await this.adminsRepository.findById(payload.id);
    } else {
      response = await this.usersRepository.findById(payload.id);
    }

    if (!response) {
      throw new UnauthorizedException('User not found');
    }

    response.isAdmin = payload.isAdmin;

    return response;
  }
}
