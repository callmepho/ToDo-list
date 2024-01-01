import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from './entities/category.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    private readonly em: EntityManager,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async createCategory(category: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      category,
    });

    if (existingCategory) {
      throw new ConflictException(`Category '${category}' already exists`);
    }
    const newCategory = new Category();
    newCategory.category = category;

    await this.categoryRepository.persistAndFlush(newCategory);

    return newCategory;
  }

  async updateCategory(id: number, category: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne(id);

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    existingCategory.category = category;

    await this.categoryRepository.flush();

    return existingCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.removeAndFlush(category);
  }
}
