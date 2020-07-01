import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedPurchaseOrder31593267803446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "orderstatus"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "orderstatus" integer NOT NULL`);
    }

}
