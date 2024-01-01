import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Todo {
  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @ManyToOne({ entity: () => Category })
  category!: Category;
}
