import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePurchaseItemTable1597843865871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "retailcost" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "wholesalecost" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "unitprice" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "wholesaleprice" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "linetotalretailCost" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "linetotalwholesaleCost" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "linetotalwholesaleCost" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "linetotalretailCost" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "wholesaleprice" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "unitprice" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "wholesalecost" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "retailcost" DROP DEFAULT`);
    }

}
