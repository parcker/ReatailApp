import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptupdateProduct1574871104968 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" ADD "itemcode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "packingtype" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "packs" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "expiredenabled" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "expiredenabled"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "packs"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "packingtype"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "itemcode"`);
    }

}
