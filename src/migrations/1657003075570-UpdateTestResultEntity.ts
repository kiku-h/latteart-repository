import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTestResultEntity1657003075570 implements MigrationInterface {
  name = "UpdateTestResultEntity1657003075570";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_TEST_RESULTS" ("test_result_id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "start_timestamp" integer NOT NULL, "end_timestamp" integer NOT NULL, "initial_url" varchar NOT NULL, "source" varchar)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_TEST_RESULTS"("test_result_id", "name", "start_timestamp", "end_timestamp", "initial_url") SELECT "test_result_id", "name", "start_timestamp", "end_timestamp", "initial_url" FROM "TEST_RESULTS"`
    );
    await queryRunner.query(`DROP TABLE "TEST_RESULTS"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_TEST_RESULTS" RENAME TO "TEST_RESULTS"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "TEST_RESULTS" RENAME TO "temporary_TEST_RESULTS"`
    );
    await queryRunner.query(
      `CREATE TABLE "TEST_RESULTS" ("test_result_id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "start_timestamp" integer NOT NULL, "end_timestamp" integer NOT NULL, "initial_url" varchar NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "TEST_RESULTS"("test_result_id", "name", "start_timestamp", "end_timestamp", "initial_url") SELECT "test_result_id", "name", "start_timestamp", "end_timestamp", "initial_url" FROM "temporary_TEST_RESULTS"`
    );
    await queryRunner.query(`DROP TABLE "temporary_TEST_RESULTS"`);
  }
}
