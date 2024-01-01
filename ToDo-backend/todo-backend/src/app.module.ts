import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { CategoryModule } from './category/category.module';
import * as cors from 'cors';
@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({ cache: true }),
    TodoModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: { apply: Function }) {
    consumer.apply(cors()).forRoutes('*');
  }
}
