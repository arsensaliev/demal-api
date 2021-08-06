import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('admins')
@Controller('api/v1/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOkResponse({ description: 'Admin authenticated.' })
  @ApiUnauthorizedResponse({ description: 'Credentials are invalid.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminsService.login(loginAdminDto);
  }

  @ApiOkResponse({ description: 'Admin data has been retrieved.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('me')
  me(@Request() req) {
    return {
      admin: req.user,
    };
  }

  @ApiOkResponse({ description: 'Admins has been retrieved.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  async findAll() {
    return {
      admins: await this.adminsService.findAll(),
    };
  }

  @ApiCreatedResponse({ description: 'Admin has been created.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return {
      admin: await this.adminsService.create(createAdminDto),
    };
  }

  @ApiOkResponse({ description: 'Admin has been retrieved.' })
  @ApiNotFoundResponse({ description: 'Admin not found.' })
  @ApiParam({ name: 'adminId', description: 'Admin indentifier', type: Number })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':adminId')
  async findOne(@Param('adminId') adminId: string) {
    return {
      admin: await this.adminsService.findOne(+adminId),
    };
  }

  @ApiOkResponse({ description: 'Admin has been updated.' })
  @ApiNotFoundResponse({ description: 'Admin not found.' })
  @ApiParam({ name: 'adminId', description: 'Admin indentifier', type: Number })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':adminId')
  async update(@Param('adminId') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    return {
      admin: await this.adminsService.update(+adminId, updateAdminDto),
    };
  }

  @ApiOkResponse({ description: 'Admin has been deleted.' })
  @ApiNotFoundResponse({ description: 'Admin not found.' })
  @ApiParam({ name: 'adminId', description: 'Admin indentifier', type: Number })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':adminId')
  remove(@Param('adminId') adminId: string) {
    return this.adminsService.remove(+adminId);
  }
}
