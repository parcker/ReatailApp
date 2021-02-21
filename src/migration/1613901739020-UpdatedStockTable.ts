import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedStockTable1613901739020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "stock_card" DROP CONSTRAINT "FK_fc8fa788a8128a0c6c01f3e79d9"`);
        await queryRunner.query(`DROP INDEX "IDX_fc8fa788a8128a0c6c01f3e79d"`);
        await queryRunner.query(`ALTER TABLE "stock_card" RENAME COLUMN "businesslocationId" TO "warehouseId"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD "statusdescription" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "stock_card" DROP COLUMN "warehouseId"`);
        await queryRunner.query(`ALTER TABLE "stock_card" ADD "warehouseId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_5b9f3f0643fe80e4f6ef3c9b1d" ON "stock_card" ("warehouseId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_5b9f3f0643fe80e4f6ef3c9b1d"`);
        await queryRunner.query(`ALTER TABLE "stock_card" DROP COLUMN "warehouseId"`);
        await queryRunner.query(`ALTER TABLE "stock_card" ADD "warehouseId" uuid`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP COLUMN "statusdescription"`);
        await queryRunner.query(`ALTER TABLE "stock_card" RENAME COLUMN "warehouseId" TO "businesslocationId"`);
        await queryRunner.query(`CREATE INDEX "IDX_fc8fa788a8128a0c6c01f3e79d" ON "stock_card" ("businesslocationId") `);
        await queryRunner.query(`ALTER TABLE "stock_card" ADD CONSTRAINT "FK_fc8fa788a8128a0c6c01f3e79d9" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
