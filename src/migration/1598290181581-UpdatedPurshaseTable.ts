import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedPurshaseTable1598290181581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "transactionstatus" character varying`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "comments" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "transactionstatus"`);
    }

}
