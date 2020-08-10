import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedSalesTable21597080839658 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sales_items" ADD "businesslocationId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "sales_items" ADD "productId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_22ff38e6b64c73d008e601d5c5" ON "sales_items" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9afe26fcfc5d27aa267d5c7aef" ON "sales_items" ("warehouseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_93d20264ad6c286dc934f3d4bc" ON "sales_items" ("businesslocationId") `);
        await queryRunner.query(`ALTER TABLE "sales_items" ADD CONSTRAINT "FK_22ff38e6b64c73d008e601d5c59" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sales_items" DROP CONSTRAINT "FK_22ff38e6b64c73d008e601d5c59"`);
        await queryRunner.query(`DROP INDEX "IDX_93d20264ad6c286dc934f3d4bc"`);
        await queryRunner.query(`DROP INDEX "IDX_9afe26fcfc5d27aa267d5c7aef"`);
        await queryRunner.query(`DROP INDEX "IDX_22ff38e6b64c73d008e601d5c5"`);
        await queryRunner.query(`ALTER TABLE "sales_items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "sales_items" ADD "productId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_items" DROP COLUMN "businesslocationId"`);
    }

}
