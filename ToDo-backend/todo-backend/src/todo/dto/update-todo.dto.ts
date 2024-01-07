import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import {
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsIn([true, false], { message: 'completed must be true or false' })
  @IsOptional()
  completed?: boolean;

  @IsOptional()
  @IsInt()
  categoryId?: number;
}
