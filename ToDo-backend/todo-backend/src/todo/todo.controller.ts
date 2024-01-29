import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(
    @Query('category') category?: string,
    @Query('completed') completed?: string,
  ) {
    const isCompleted = completed ? completed === 'true' : undefined;
    if (category !== undefined || isCompleted !== undefined) {
      return this.todoService.getTodosByParam(category, isCompleted);
    } else {
      return this.todoService.getAllTodos();
    }
  }
  @Get(':id')
  async getTodoById(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Put(':id')
  updatePut(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Patch(':id')
  updatePatch(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
}
