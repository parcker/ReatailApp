import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedPurchaseOrder41593269407243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_692d6d35b8f74bccf22f154c942" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_692d6d35b8f74bccf22f154c942"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "businessId"`);
    }

}
