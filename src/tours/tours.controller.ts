import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import diskStorage from 'src/utils/disk-storage.util';

@Controller('api/v1/tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @ApiOkResponse({ description: 'Tours has been retrieved.' })
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
  @ApiParam({
    name: 'tourId',
    description: 'Tour identifier',
    type: Number,
  })
  @Patch(':tourId')
  async update(
    @Param('tourId') tourId: string,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    return {
      tour: await this.toursService.update(+tourId, updateTourDto),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }

  @ApiOkResponse({ description: 'Tour image has been uploaded.' })
  @ApiNotFoundResponse({ description: 'Tour not found.' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage,
    }),
  )
  @Post(':tourId/images')
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('tourId') tourId: string,
  ) {
    const imagePath = image.path.replace(/\\/g, '/');
    return {
      tour: await this.toursService.uploadImage(+tourId, { imagePath }),
    };
  }

  @ApiOkResponse({ description: 'Tour image has been deleted.' })
  @ApiNotFoundResponse({ description: 'Tour not found.' })
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
