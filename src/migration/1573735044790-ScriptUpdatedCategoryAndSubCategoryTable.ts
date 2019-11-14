import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptUpdatedCategoryAndSubCategoryTable1573735044790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_7974e12e95204b0e09a086220f6"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_9b467788db5200b9a234515d4aa"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "businesslocationId" TO "businessId"`);
        await queryRunner.query(`ALTER TABLE "sub_category" RENAME COLUMN "businesslocationId" TO "businessId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_38a5797d0473710fb41af5a97f1" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_99a26d343738525a71710e1b898" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_99a26d343738525a71710e1b898"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_38a5797d0473710fb41af5a97f1"`);
        await queryRunner.query(`ALTER TABLE "sub_category" RENAME COLUMN "businessId" TO "businesslocationId"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "businessId" TO "businesslocationId"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_9b467788db5200b9a234515d4aa" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_7974e12e95204b0e09a086220f6" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
