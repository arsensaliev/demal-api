import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from 'src/data/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async register(payload: CreateUserDto) {
    let user: User = await this.usersRepository.findByEmail(payload.email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.authService.hashPassword(
      payload.password,
    );
    user = await this.usersRepository.insertAndFetch({
      ...payload,
      password: hashedPassword,
    });
    const tokenPayload = this.getTokenPayloadFromUser(user);
    const token = this.authService.generateAuthToken(tokenPayload);

    return {
      auth: {
        token,
      },
      user,
    };
  }

  async login(payload: LoginUserDto) {
    const user = await this.usersRepository.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      user.password,
      payload.password,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const tokenPayload = this.getTokenPayloadFromUser(user);
    const token = this.authService.generateAuthToken(tokenPayload);

    return {
      auth: {
        token,
      },
      user,
    };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.updateAndFetchById(id, payload);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    const rowsDeleted = await this.usersRepository.deleteById(id);
    if (!rowsDeleted) {
      throw new NotFoundException('User not found');
    }
  }

  private getTokenPayloadFromUser(user: User): TokenPayload {
    return {
      id: user.id,
      isAdmin: false,
    };
  }
}
