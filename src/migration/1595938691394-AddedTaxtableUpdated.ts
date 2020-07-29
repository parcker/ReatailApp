import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTaxtableUpdated1595938691394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fiscal_year" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "tax" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" ADD CONSTRAINT "FK_cf660d096a723848bafa34e6506" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tax" ADD CONSTRAINT "FK_580c630269c64b1166ba75c659b" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tax" DROP CONSTRAINT "FK_580c630269c64b1166ba75c659b"`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" DROP CONSTRAINT "FK_cf660d096a723848bafa34e6506"`);
        await queryRunner.query(`ALTER TABLE "tax" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" DROP COLUMN "businessId"`);
    }

}
