import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDbScrip31571842055109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_premission" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_premission" ADD CONSTRAINT "FK_ac8e782ab0a27f3b545cdbf1bc5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_premission" DROP CONSTRAINT "FK_ac8e782ab0a27f3b545cdbf1bc5"`);
        await queryRunner.query(`ALTER TABLE "user_premission" DROP COLUMN "userId"`);
    }

}
