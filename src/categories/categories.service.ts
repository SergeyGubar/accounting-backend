import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryT } from '../mongo/category.schema';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {
  }

  addCategory(createCategoryDto: CreateCategoryDto, ownerId: string): Promise<Category> {
    const category: CategoryT = {
      ownerId,
      title: createCategoryDto.title,
    };
    return this.categoryModel.create(category);
  }

  delete(id: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.categoryModel.findByIdAndRemove(id, (err, res) => {
        if (err || res == null) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  allCategories(ownerId: string): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.categoryModel.find({ ownerId }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async categoryById(id: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.categoryModel.findById(id, (err, res) => {
        if (err || res == null) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

}
