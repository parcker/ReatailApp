import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedPurchaseOrder21593253393259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "isconfirmed" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "confirmedbyId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba" FOREIGN KEY ("confirmedbyId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "confirmedbyId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "isconfirmed"`);
    }

}
