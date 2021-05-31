import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedMerchantRole41622446081905 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_role" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_role" DROP COLUMN "description"`);
    }

}
