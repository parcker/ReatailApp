import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOrderItemTable11608308950470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "instockqty" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "committedqty" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "orderedqty" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "availableqty" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "availableqty" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "orderedqty" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "committedqty" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "store_product" ALTER COLUMN "instockqty" DROP DEFAULT`);
    }

}
