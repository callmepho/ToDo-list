import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  category: string;
}
