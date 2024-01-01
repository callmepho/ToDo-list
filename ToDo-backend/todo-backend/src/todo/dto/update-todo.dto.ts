import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTodoDto {
  @IsNotEmpty()
  description: string;

  @IsInt()
  categoryId: number;
}
