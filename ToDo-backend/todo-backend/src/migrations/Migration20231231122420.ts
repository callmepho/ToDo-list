import { Migration } from '@mikro-orm/migrations';

export class Migration20231231122420 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `category` change `name` `category` varchar(255) not null;');

    this.addSql('alter table `todo` modify `category_id` int unsigned not null;');
    this.addSql('alter table `todo` change `todo` `description` varchar(255) not null;');
    this.addSql('alter table `todo` add constraint `todo_category_id_foreign` foreign key (`category_id`) references `category` (`id`) on update cascade;');
    this.addSql('alter table `todo` add index `todo_category_id_index`(`category_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `todo` drop foreign key `todo_category_id_foreign`;');

    this.addSql('alter table `category` change `category` `name` varchar(255) not null;');

    this.addSql('alter table `todo` modify `category_id` int not null;');
    this.addSql('alter table `todo` drop index `todo_category_id_index`;');
    this.addSql('alter table `todo` change `description` `todo` varchar(255) not null;');
  }

}
