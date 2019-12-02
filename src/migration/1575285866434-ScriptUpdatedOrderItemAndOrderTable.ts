import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptUpdatedOrderItemAndOrderTable1575285866434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "haspricebench" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "haspricebench" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
    }

}
