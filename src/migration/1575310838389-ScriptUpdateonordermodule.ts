import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptUpdateonordermodule1575310838389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "orderstatus" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderstatus"`);
    }

}
