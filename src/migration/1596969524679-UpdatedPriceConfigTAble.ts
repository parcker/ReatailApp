import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedPriceConfigTAble1596969524679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "Active" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "Active"`);
    }

}
