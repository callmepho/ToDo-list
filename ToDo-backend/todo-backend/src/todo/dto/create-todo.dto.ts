import { Transform } from 'class-transformer';
import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  description: string;

  @IsInt()
  categoryId: number;
}
