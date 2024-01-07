import { Migration } from '@mikro-orm/migrations';

export class Migration20240104061429 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `todo` add `completed` tinyint(1) not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `todo` drop `completed`;');
  }

}
