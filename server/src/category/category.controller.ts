import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Get()
  async getAllCategories(@Query() query: ExpressQuery): Promise<{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    categories: Category[];
  }> {
    return this.categoryService.findAll(query);
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
