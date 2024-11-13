import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  // Create Category
  async create(category: Category): Promise<Category> {
    // Check if category name already exists
    const categoryExists = await this.categoryModel
      .findOne({ name: category.name })
      .exec();
    if (categoryExists) {
      throw new ConflictException(
        `Category with the name "${category.name}" already exists.`,
      );
    }
    const res = await this.categoryModel.create(category);
    return res;
  }

  // Fetch all the categories
  async findAll(query: Query): Promise<{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    categories: Category[];
  }> {
    // Pagination
    const limit = 2;
    const currentPage = Number(query.page) || 1;
    const skip = limit * (currentPage - 1);

    // Search
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    // Total Items
    const totalItems = await this.categoryModel.countDocuments({ ...keyword });

    const categories = await this.categoryModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip)
      .exec();

    return { currentPage, itemsPerPage: limit, totalItems, categories };
  }

  // Fetch single category
  async findById(id: string): Promise<Category> {
    // ID validation
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('Please enter valid id..');
    }

    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category Not Found');
    }
    return category;
  }

  // Update category
  async findUpdateById(id: string, category: Category): Promise<Category> {
    // ID validation
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('Please enter valid id..');
    }
    // Check if the new category name already exists
    if (category.name) {
      const existingCategory = await this.categoryModel
        .findOne({ name: category.name, _id: { $ne: id } })
        .exec();
      if (existingCategory) {
        throw new ConflictException(
          `Category with the name "${category.name}" already exists.`,
        );
      }
    }
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }

  // Delete category
  async deleteCategory(id: string): Promise<Category> {
    // ID validation
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('Please enter valid id..');
    }
    const deleted = await this.categoryModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Category Not Found');
    }

    return deleted;
  }
}
