import {MigrationInterface, QueryRunner} from "typeorm";

export class stockCardTBIndexed1590755992996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "stock_card" ADD "Quantity" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_fc8fa788a8128a0c6c01f3e79d" ON "stock_card" ("businesslocationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_023e24d32b48071bda0f9bc5af" ON "stock_card" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_831a09ba37eecc411d560f2e17" ON "stock_card" ("Direction") `);
        await queryRunner.query(`CREATE INDEX "IDX_93bd7d26e1de63240900871503" ON "stock_card" ("Quantity") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_93bd7d26e1de63240900871503"`);
        await queryRunner.query(`DROP INDEX "IDX_831a09ba37eecc411d560f2e17"`);
        await queryRunner.query(`DROP INDEX "IDX_023e24d32b48071bda0f9bc5af"`);
        await queryRunner.query(`DROP INDEX "IDX_fc8fa788a8128a0c6c01f3e79d"`);
        await queryRunner.query(`ALTER TABLE "stock_card" DROP COLUMN "Quantity"`);
    }

}
