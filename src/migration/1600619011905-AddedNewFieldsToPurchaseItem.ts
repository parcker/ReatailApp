import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedNewFieldsToPurchaseItem1600619011905 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" ADD "suppliedctnqty" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "parkinginfo" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "parkinginfo"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "suppliedctnqty"`);
    }

}
