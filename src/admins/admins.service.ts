import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import AdminResource from './interfaces/admin-resource.interface';
import TokenPayload from './interfaces/token-payload.interface';
import { AdminsRepository } from '../data/repositories/admins.repository';

@Injectable()
export class AdminsService {
  constructor(
    private readonly adminsRepository: AdminsRepository,
    private readonly authService: AuthService,
  ) {}

  async login(payload: LoginAdminDto) {
    const admin = await this.adminsRepository.findByEmail(payload.email);
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      admin.password,
      payload.password,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException('Password does not match');
    }

    const tokenPayload = this.getTokenPayload(admin);
    const token = this.authService.generateAuthToken(tokenPayload);
    const adminResource = this.getAdminResource(admin);

    return {
      auth: {
        token,
      },
      admin: adminResource,
    };
  }

  findAll(): Promise<Admin[]> {
    return this.adminsRepository.getAdmins();
  }

  create(payload: CreateAdminDto): Promise<Admin> {
    return this.adminsRepository.insertAndFetch(payload);
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminsRepository.findById(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async update(id: number, payload: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminsRepository.updateAndFetchById(id, payload);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async remove(id: number) {
    const rowsDeleted = await this.adminsRepository.deleteById(id);
    if (!rowsDeleted) {
      throw new NotFoundException('Admin not found');
    }
  }

  private getTokenPayload(admin: Admin): TokenPayload {
    return {
      id: admin.id,
      isAdmin: true,
    };
  }

  private getAdminResource = (admin: Admin): AdminResource => ({
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    createdAt: admin.createdAt,
  });
}
