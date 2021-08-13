import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserGuard } from 'src/auth/user.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import diskStorage from 'src/utils/disk-storage.util';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ description: 'User has been registered.' })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @ApiOkResponse({ description: 'User has been logged in.' })
  @ApiUnauthorizedResponse({ description: 'Credentials are invalid.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiOkResponse({ description: 'User has been retrieved.' })
  @ApiUnauthorizedResponse({ description: 'Credentials are invalid.' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Get('me')
  me(@Request() request) {
    return {
      user: request.user,
    };
  }

  @ApiOkResponse({ description: 'Users has been retrieved.' })
  @Get()
  async findAll() {
    return {
      users: await this.usersService.findAll(),
    };
  }

  @ApiOkResponse({ description: 'User has been retrieved.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiParam({ name: 'userId', description: 'User identifier', type: Number })
  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return {
      user: await this.usersService.findById(+userId),
    };
  }

  @ApiOkResponse({ description: 'User has been updated.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiParam({ name: 'userId', description: 'User identifier', type: Number })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      user: await this.usersService.update(+userId, updateUserDto),
    };
  }

  @ApiOkResponse({ description: 'User has been deleted.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiParam({ name: 'userId', description: 'User identifier', type: Number })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(+userId);
  }

  @ApiOkResponse({ description: 'User image has been uploaded.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @UseGuards(JwtAuthGuard, UserGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage,
    }),
  )
  @Post('me/avatar')
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Request() request,
  ) {
    const user = request.user;
    const imagePath = image.path.replace(/\\/g, '/');
    return {
      user: await this.usersService.uploadImage(+user.id, { imagePath }),
    };
  }
}
