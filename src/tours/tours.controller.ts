import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import diskStorage from 'src/utils/disk-storage.util';
import { InsertTourImageDto } from 'src/data/dto/insert-tour-image.dto';

@ApiTags('tours')
@Controller('api/v1/tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @ApiCreatedResponse({ description: 'Tour has been created.' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() payload: CreateTourDto) {
    return {
      tour: await this.toursService.create(payload),
    };
  }

  @ApiOkResponse({ description: 'Tours has been retrieved.' })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    schema: { default: 'createdAt' },
  })
  @ApiQuery({
    name: 'order',
    required: false,
    schema: { default: 'desc' },
  })
  @Get()
  findAll(@Query('sortBy') sortBy: string, @Query('order') order: string) {
    return this.toursService.findAll({ sortBy, order });
  }

  @ApiOkResponse({ description: 'Tour has been retrieved.' })
  @ApiNotFoundResponse({ description: 'Tour not found.' })
  @ApiParam({
    name: 'tourId',
    description: 'Tour identifier',
    type: Number,
  })
  @Get(':tourId')
  async findOne(@Param('tourId') tourId: string) {
    return {
      tour: await this.toursService.findOne(+tourId),
    };
  }

  @ApiOkResponse({ description: 'Tour has been updated.' })
  @ApiNotFoundResponse({ description: 'Tour not found.' })
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'tourId',
    description: 'Tour identifier',
    type: Number,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':tourId')
  async update(
    @Param('tourId') tourId: string,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    return {
      tour: await this.toursService.update(+tourId, updateTourDto),
    };
  }

  @ApiOkResponse({ description: 'Tour has been deleted.' })
  @ApiNotFoundResponse({ description: 'Tour not found.' })
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'tourId',
    description: 'Tour identifier',
    type: Number,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':tourId')
  remove(@Param('tourId') tourId: string) {
    return this.toursService.remove(+tourId);
  }

  @ApiOkResponse({ description: 'Tour image has been uploaded.' })
  @ApiNotFoundResponse({ description: 'Tour not found.' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10, { storage: diskStorage }))
  @Post(':tourId/images')
  async uploadImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('tourId') tourId: string,
  ) {
    const images: Array<InsertTourImageDto> = files
      .map((file) => ({
        imagePath: file.path.replace(/\\/g, '/'),
      }))
      .map((file) => ({
        imagePath: file.imagePath.replace('/tmp/', ''),
      }));

    console.log(images);

    const tour = await this.toursService.uploadImage(+tourId, images);

    return {
      tour: tour,
    };
  }

  @ApiOkResponse({ description: 'Tour image has been deleted.' })
  @ApiNotFoundResponse({ description: 'Tour not found.' })
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'imageId',
    description: 'Tour identifier',
    type: Number,
  })
  @ApiParam({ name: 'imageId', description: 'Image identifier', type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete(':tourId/images/:imageId')
  deleteImage(
    @Param('tourId') tourId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.toursService.removeImage(+tourId, +imageId);
  }
}
