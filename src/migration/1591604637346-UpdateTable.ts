import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTable1591604637346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "application_route" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "user_premission" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "order_payment" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "stock_card" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "business_location" DROP COLUMN "IsActive"`);
        await queryRunner.query(`ALTER TABLE "business_location_user" DROP COLUMN "IsActive"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "business_location_user" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "business_location" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "business" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_card" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_payment" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_premission" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application_route" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD "IsActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD "IsActive" boolean NOT NULL`);
    }

}
