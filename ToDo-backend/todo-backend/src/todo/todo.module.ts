import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Todo] }), CategoryModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
