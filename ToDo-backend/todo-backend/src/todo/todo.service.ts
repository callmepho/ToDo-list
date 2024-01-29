import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { plainToInstance } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
    private readonly em: EntityManager,
    private readonly categoryService: CategoryService,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.findAll({ populate: ['category'] });
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id, {
      populate: ['category'],
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  async getTodosByParam(category: string, completed: boolean): Promise<Todo[]> {
    const query: Record<any, any> = {};

    if (completed == false) {
      query.completed = completed;
    }

    if (category !== undefined) {
      query.category = { category };
    }

    return this.todoRepository.find(query, { populate: ['category'] });
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { description, categoryId } = createTodoDto;

    let category: Category | null = null;

    if (categoryId !== undefined && categoryId !== null) {
      category = await this.categoryService.getCategoryById(categoryId);

      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
    }

    const newTodo = this.em.create(Todo, {
      description,
      category: category || null,
    });
    await this.todoRepository.persistAndFlush(newTodo);

    return newTodo;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.em.assign(todo, updateTodoDto);

    await this.todoRepository.persistAndFlush(todo);

    return todo;
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    await this.todoRepository.removeAndFlush(todo);
  }
}
