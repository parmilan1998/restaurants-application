import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  // Create Category
  async create(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);
    return res;
  }

  // Fetch all the categories
  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  // Fetch single category
  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category Not Found');
    }

    return category;
  }

  // Update category
  async findUpdateById(id: string, category: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }

  // Delete category
  async deleteCategory(id: string): Promise<Category> {
    const deleted = await this.categoryModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Category Not Found');
    }

    return deleted;
  }
}
