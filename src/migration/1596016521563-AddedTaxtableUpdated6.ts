import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTaxtableUpdated61596016521563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP CONSTRAINT "FK_defceee8fa6659db132e12bfd85"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_99a26d343738525a71710e1b898"`);
        await queryRunner.query(`DROP INDEX "IDX_defceee8fa6659db132e12bfd8"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" RENAME COLUMN "taxId" TO "salestaxId"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "businessId"`);
        await queryRunner.query(`CREATE INDEX "IDX_4230984bdc25ecb7c4924add02" ON "product_configuration" ("salestaxId") `);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD CONSTRAINT "FK_4230984bdc25ecb7c4924add02e" FOREIGN KEY ("salestaxId") REFERENCES "tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP CONSTRAINT "FK_4230984bdc25ecb7c4924add02e"`);
        await queryRunner.query(`DROP INDEX "IDX_4230984bdc25ecb7c4924add02"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_configuration" RENAME COLUMN "salestaxId" TO "taxId"`);
        await queryRunner.query(`CREATE INDEX "IDX_defceee8fa6659db132e12bfd8" ON "product_configuration" ("taxId") `);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_99a26d343738525a71710e1b898" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD CONSTRAINT "FK_defceee8fa6659db132e12bfd85" FOREIGN KEY ("taxId") REFERENCES "tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
