import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedSupplierTB1592741075503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_3e709ce06a9e3ccd49d8c913bce"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_beb436344a3af6611cbfac22e7b"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "businesslocationId"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "website" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "contactpersonname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "contactpersonphonenumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "contactpersonemail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "street" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "facebook" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "instagram" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "twitter" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_32b6011b7ad5cb5f5096b8f7f09" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_beb436344a3af6611cbfac22e7b" FOREIGN KEY ("productconfigurationId") REFERENCES "product_configuration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_beb436344a3af6611cbfac22e7b"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_32b6011b7ad5cb5f5096b8f7f09"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "twitter"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "instagram"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "facebook"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "contactpersonemail"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "contactpersonphonenumber"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "contactpersonname"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "businesslocationId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_beb436344a3af6611cbfac22e7b" FOREIGN KEY ("productconfigurationId") REFERENCES "product_configuration"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_3e709ce06a9e3ccd49d8c913bce" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
