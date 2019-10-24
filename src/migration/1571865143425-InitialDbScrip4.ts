import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDbScrip41571865143425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "role" ADD "createdby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD "updatedby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD "createdby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD "updatedby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_route" ADD "createdby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_route" ADD "updatedby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_premission" ADD "createdby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_premission" ADD "updatedby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "business" ADD "createdby" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "business" ADD "updatedby" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "updatedby"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "createdby"`);
        await queryRunner.query(`ALTER TABLE "user_premission" DROP COLUMN "updatedby"`);
        await queryRunner.query(`ALTER TABLE "user_premission" DROP COLUMN "createdby"`);
        await queryRunner.query(`ALTER TABLE "application_route" DROP COLUMN "updatedby"`);
        await queryRunner.query(`ALTER TABLE "application_route" DROP COLUMN "createdby"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP COLUMN "updatedby"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP COLUMN "createdby"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updatedby"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "createdby"`);
    }

}
