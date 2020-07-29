import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTaxtableUpdated31595966410125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "FK_678622c05aa9f76cb6dd4b6f675"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "UQ_678622c05aa9f76cb6dd4b6f675"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "FK_678622c05aa9f76cb6dd4b6f675" FOREIGN KEY ("taxId") REFERENCES "tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "FK_678622c05aa9f76cb6dd4b6f675"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "UQ_678622c05aa9f76cb6dd4b6f675" UNIQUE ("taxId")`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "FK_678622c05aa9f76cb6dd4b6f675" FOREIGN KEY ("taxId") REFERENCES "tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
