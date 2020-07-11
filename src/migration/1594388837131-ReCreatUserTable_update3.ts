import {MigrationInterface, QueryRunner} from "typeorm";

export class ReCreatUserTableUpdate31594388837131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userType" integer NOT NULL DEFAULT 3`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userType"`);
    }

}
