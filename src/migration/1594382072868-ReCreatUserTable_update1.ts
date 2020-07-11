import {MigrationInterface, QueryRunner} from "typeorm";

export class ReCreatUserTableUpdate11594382072868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "siguptoken"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "siguptoken" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "siguptoken"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "siguptoken" character varying NOT NULL`);
    }

}
