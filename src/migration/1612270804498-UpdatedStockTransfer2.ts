import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedStockTransfer21612270804498 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" ADD "stockTransferdetailId" uuid`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" ADD CONSTRAINT "FK_b5c7717ccf3842c7bdd07d7c010" FOREIGN KEY ("stockTransferdetailId") REFERENCES "stock_transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" DROP CONSTRAINT "FK_b5c7717ccf3842c7bdd07d7c010"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer_items" DROP COLUMN "stockTransferdetailId"`);
    }

}
