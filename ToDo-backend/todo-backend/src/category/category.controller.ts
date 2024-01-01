import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() body: { category: string }) {
    return this.categoryService.createCategory(body.category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: { category: string },
  ) {
    return this.categoryService.updateCategory(id, body.category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
