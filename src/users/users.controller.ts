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
  UseInterceptors,
  UploadedFile,
  Req,
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
import { AddWishlistTourDto } from './dto/add-wishlist-tour.dto';

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
  async me(@Req() request) {
    return {
      user: await this.usersService.findById(request.user.id),
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
    @Req() request,
  ) {
    const user = request.user;
    const imagePath = image.path.replace(/\\/g, '/');
    return {
      user: await this.usersService.uploadImage(+user.id, { imagePath }),
    };
  }

  @ApiOkResponse({
    description: 'Wishlist tours of the user has been retrieved.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiParam({ name: 'userId', description: 'User identifier', type: Number })
  @UseGuards(JwtAuthGuard)
  @Get(':userId/wishlist')
  async findWishlistTours(@Param('userId') userId: string) {
    return {
      tours: await this.usersService.findWishlistTours(+userId),
    };
  }

  @ApiCreatedResponse({ description: 'Tour has been added into wishlist.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiParam({ name: 'userId', description: 'User identifier', type: Number })
  @UseGuards(JwtAuthGuard)
  @Post(':userId/wishlist')
  async addWishlistTour(
    @Param('userId') userId: string,
    @Body() addWishlistTourDto: AddWishlistTourDto,
  ) {
    return {
      tour: await this.usersService.addWishlistTour(
        +userId,
        addWishlistTourDto,
      ),
    };
  }

  @ApiOkResponse({ description: 'Tour has been deleted from wishlist.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiParam({ name: 'userId', description: 'User identifier', type: Number })
  @ApiParam({
    name: 'tourId',
    description: 'Tour identifier',
    type: Number,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':userId/wishlist/:tourId')
  removeWishlistTour(
    @Param('userId') userId: string,
    @Param('tourId') tourId: string,
  ) {
    return this.usersService.removeWishlistTour(+userId, +tourId);
  }
}
