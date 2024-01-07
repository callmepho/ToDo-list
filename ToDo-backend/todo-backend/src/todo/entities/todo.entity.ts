import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { IsBoolean, IsIn } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Todo {
  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @Property({ type: 'boolean', default: false })
  completed: boolean;

  @ManyToOne({ entity: () => Category, nullable: true })
  category?: Category;

  constructor(
    description: string,
    completed: boolean = false,
    category?: Category,
  ) {
    this.description = description;
    this.completed = completed;
    this.category = category;
  }
}
