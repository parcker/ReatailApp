import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStockTranferTable1612524764918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_12c07f8369e4e48084ebfcee73"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" DROP COLUMN "warehouseId"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" ADD "transfertype" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" ADD "fromwarehouseId" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" ADD "towarehouseId" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`CREATE INDEX "IDX_eeb19ead9a08b39ec5109bf2ae" ON "stock_transfer_items" ("transfertype") `);
        await queryRunner.query(`CREATE INDEX "IDX_28c55e90a340b9278a2f7112f6" ON "stock_transfer_items" ("fromwarehouseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_517438ce0538206b82557ec08e" ON "stock_transfer_items" ("towarehouseId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_517438ce0538206b82557ec08e"`);
        await queryRunner.query(`DROP INDEX "IDX_28c55e90a340b9278a2f7112f6"`);
        await queryRunner.query(`DROP INDEX "IDX_eeb19ead9a08b39ec5109bf2ae"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" DROP COLUMN "towarehouseId"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" DROP COLUMN "fromwarehouseId"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" DROP COLUMN "transfertype"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" ADD "warehouseId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_12c07f8369e4e48084ebfcee73" ON "stock_transfer_items" ("warehouseId") `);
    }

}
