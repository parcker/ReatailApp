import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTaxtableUpdated41595966701111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "FK_678622c05aa9f76cb6dd4b6f675"`);
        await queryRunner.query(`DROP INDEX "IDX_678622c05aa9f76cb6dd4b6f67"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "taxId"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD "taxId" uuid`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "FK_b3beed5d4b57fd35b1dc80921bc"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "UQ_b3beed5d4b57fd35b1dc80921bc"`);
        await queryRunner.query(`CREATE INDEX "IDX_defceee8fa6659db132e12bfd8" ON "product_configuration" ("taxId") `);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD CONSTRAINT "FK_defceee8fa6659db132e12bfd85" FOREIGN KEY ("taxId") REFERENCES "tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "FK_b3beed5d4b57fd35b1dc80921bc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "FK_b3beed5d4b57fd35b1dc80921bc"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP CONSTRAINT "FK_defceee8fa6659db132e12bfd85"`);
        await queryRunner.query(`DROP INDEX "IDX_defceee8fa6659db132e12bfd8"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "UQ_b3beed5d4b57fd35b1dc80921bc" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "FK_b3beed5d4b57fd35b1dc80921bc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP COLUMN "taxId"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "taxId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_678622c05aa9f76cb6dd4b6f67" ON "price_configuration" ("taxId") `);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "FK_678622c05aa9f76cb6dd4b6f675" FOREIGN KEY ("taxId") REFERENCES "tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
