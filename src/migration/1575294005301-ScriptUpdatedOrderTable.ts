import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptUpdatedOrderTable1575294005301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "balance"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "balance" integer NOT NULL`);
    }

}
