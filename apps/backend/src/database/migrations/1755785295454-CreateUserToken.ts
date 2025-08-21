import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserToken1755785295454 implements MigrationInterface {
  name = 'CreateUserToken1755785295454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" text NOT NULL, "expires_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" text NOT NULL, "expires_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_79ac751931054ef450a2ee47778" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_token"("id", "refresh_token", "expires_at", "created_at", "user_id") SELECT "id", "refresh_token", "expires_at", "created_at", "user_id" FROM "user_token"`,
    );
    await queryRunner.query(`DROP TABLE "user_token"`);
    await queryRunner.query(`ALTER TABLE "temporary_user_token" RENAME TO "user_token"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_token" RENAME TO "temporary_user_token"`);
    await queryRunner.query(
      `CREATE TABLE "user_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" text NOT NULL, "expires_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "user_token"("id", "refresh_token", "expires_at", "created_at", "user_id") SELECT "id", "refresh_token", "expires_at", "created_at", "user_id" FROM "temporary_user_token"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user_token"`);
    await queryRunner.query(`DROP TABLE "user_token"`);
  }
}
