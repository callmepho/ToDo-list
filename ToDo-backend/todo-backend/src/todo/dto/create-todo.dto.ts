import { Transform } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class CreateTodoDto {
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
