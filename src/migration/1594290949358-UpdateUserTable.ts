import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTable1594290949358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users"`);
     
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    //     await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "siguptoken"`);
    //     await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedby"`);
    //     await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdby"`);
    //     await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dateUpdated"`);
    //     await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dateCreated"`);
     }

}
