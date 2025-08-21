import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1755785213652 implements MigrationInterface {
  name = 'CreateUser1755785213652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "username" varchar(60) NOT NULL, "password" text NOT NULL, "role" varchar CHECK( "role" IN ('admin','trainer','student') ) NOT NULL, "status" varchar CHECK( "status" IN ('active','inactive') ) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
