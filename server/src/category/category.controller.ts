import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async fetchCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoryService.findUpdateById(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
