import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedUSerTAble1593345089915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "businesslocationId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_82c748fcfda007eb5c77297373c" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_82c748fcfda007eb5c77297373c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "businesslocationId"`);
    }

}
