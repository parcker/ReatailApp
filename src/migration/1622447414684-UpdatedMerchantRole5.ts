import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedMerchantRole51622447414684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_role" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_role" ADD "description" character varying NOT NULL`);
    }

}
