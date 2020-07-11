import {MigrationInterface, QueryRunner} from "typeorm";

export class ReCreatUserTableUpdate1594379852501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "role_user" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "application_route" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user_premission" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "stock_card" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "sub_category" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "payment_mode" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "payment_term" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "business" ALTER COLUMN "isDisabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "business_location" ALTER COLUMN "isDisabled" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "business_location" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "business" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment_term" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment_mode" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sub_category" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "stock_card" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "supplier" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_premission" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "application_route" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "role_user" ALTER COLUMN "isDisabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "isDisabled" DROP DEFAULT`);
    }

}
