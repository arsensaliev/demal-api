import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiCreatedResponse({ description: 'Category has been created.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return {
      category: await this.categoriesService.create(createCategoryDto),
    };
  }

  @ApiOkResponse({ description: 'Categories has been retrieved.' })
  @Get()
  async findAll() {
    return {
      categories: await this.categoriesService.findAll(),
    };
  }

  @ApiOkResponse({ description: 'Category has been retrieved.' })
  @ApiNotFoundResponse({ description: 'Category not found.' })
  @ApiParam({
    name: 'categoryId',
    description: 'Category indentifier',
    type: Number,
  })
  @Get(':categoryId')
  async findOne(@Param('categoryId') categoryId: string) {
    return {
      category: await this.categoriesService.findOne(+categoryId),
    };
  }

  @ApiOkResponse({ description: 'Category has been updated.' })
  @ApiNotFoundResponse({ description: 'Category not found.' })
  @ApiParam({
    name: 'categoryId',
    description: 'Category indentifier',
    type: Number,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':categoryId')
  async update(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return {
      category: await this.categoriesService.update(
        +categoryId,
        updateCategoryDto,
      ),
    };
  }

  @ApiOkResponse({ description: 'Category has been deleted.' })
  @ApiNotFoundResponse({ description: 'Category not found.' })
  @ApiParam({
    name: 'categoryId',
    description: 'Category indentifier',
    type: Number,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.categoriesService.remove(+categoryId);
  }
}
