import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateonPurchaseOrder21597401515880 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" ADD "linetotalretailCost" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "linetotalwholesaleCost" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "linetotalwholesaleCost"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "linetotalretailCost"`);
    }

}
