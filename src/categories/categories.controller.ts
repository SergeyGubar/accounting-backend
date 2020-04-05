import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Category } from '../mongo/category.schema';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addCategory(@Body() createCategoryDto: CreateCategoryDto, @Request() req): Promise<Category> {
    return this.categoriesService.addCategory(createCategoryDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.delete(id);
  }

  @Get('allMy')
  @UseGuards(AuthGuard('jwt'))
  myCategories(@Request() req): Promise<Category[]> {
    return this.categoriesService.allCategories(req.user.userId);
  }
}
