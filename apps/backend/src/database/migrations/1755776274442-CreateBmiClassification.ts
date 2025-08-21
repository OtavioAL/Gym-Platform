import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBmiClassification1755776274442 implements MigrationInterface {
  name = 'CreateBmiClassification1755776274442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bmi_classification" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "label" text NOT NULL, "description" text, CONSTRAINT "UQ_6037f9e2ef9eb7dbfc7c6a9c95b" UNIQUE ("label"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bmi_assessment" ("id" varchar PRIMARY KEY NOT NULL, "height" decimal(5,2) NOT NULL, "weight" decimal(6,2) NOT NULL, "bmi" decimal(6,2) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "classification_id" integer, "evaluator_user_id" varchar, "student_user_id" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_bmi_assessment" ("id" varchar PRIMARY KEY NOT NULL, "height" decimal(5,2) NOT NULL, "weight" decimal(6,2) NOT NULL, "bmi" decimal(6,2) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "classification_id" integer, "evaluator_user_id" varchar, "student_user_id" varchar, CONSTRAINT "FK_c2b514d2ab88eedfd6cb0ea4a7d" FOREIGN KEY ("classification_id") REFERENCES "bmi_classification" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_66139dc06e3d3657be548c47e6e" FOREIGN KEY ("evaluator_user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1cdc5668dabd0236d9f481ac9e8" FOREIGN KEY ("student_user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_bmi_assessment"("id", "height", "weight", "bmi", "created_at", "classification_id", "evaluator_user_id", "student_user_id") SELECT "id", "height", "weight", "bmi", "created_at", "classification_id", "evaluator_user_id", "student_user_id" FROM "bmi_assessment"`,
    );
    await queryRunner.query(`DROP TABLE "bmi_assessment"`);
    await queryRunner.query(`ALTER TABLE "temporary_bmi_assessment" RENAME TO "bmi_assessment"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bmi_assessment" RENAME TO "temporary_bmi_assessment"`);
    await queryRunner.query(
      `CREATE TABLE "bmi_assessment" ("id" varchar PRIMARY KEY NOT NULL, "height" decimal(5,2) NOT NULL, "weight" decimal(6,2) NOT NULL, "bmi" decimal(6,2) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "classification_id" integer, "evaluator_user_id" varchar, "student_user_id" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "bmi_assessment"("id", "height", "weight", "bmi", "created_at", "classification_id", "evaluator_user_id", "student_user_id") SELECT "id", "height", "weight", "bmi", "created_at", "classification_id", "evaluator_user_id", "student_user_id" FROM "temporary_bmi_assessment"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_bmi_assessment"`);
    await queryRunner.query(`DROP TABLE "bmi_assessment"`);
    await queryRunner.query(`DROP TABLE "bmi_classification"`);
  }
}
