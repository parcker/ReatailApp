import {MigrationInterface, QueryRunner} from "typeorm";

export class SricptChangeGenderColumn1573996011784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "gender" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "gender" boolean NOT NULL`);
    }

}
