import { Migration } from '@mikro-orm/migrations';

export class Migration20250408143611 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(180) not null, "password" varchar(255) null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
