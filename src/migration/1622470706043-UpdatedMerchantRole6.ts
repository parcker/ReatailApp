import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedMerchantRole61622470706043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "merchant_role" DROP CONSTRAINT "FK_9c552fce3a3f6875ecb51e304a2"`);
        await queryRunner.query(`ALTER TABLE "merchant_role" ALTER COLUMN "businessId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP CONSTRAINT "FK_7546e717697c4dca6c12ee2601e"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP CONSTRAINT "UQ_7546e717697c4dca6c12ee2601e"`);
        await queryRunner.query(`ALTER TABLE "merchant_role" ADD CONSTRAINT "FK_9c552fce3a3f6875ecb51e304a2" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD CONSTRAINT "FK_7546e717697c4dca6c12ee2601e" FOREIGN KEY ("merchantuserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP CONSTRAINT "FK_7546e717697c4dca6c12ee2601e"`);
        await queryRunner.query(`ALTER TABLE "merchant_role" DROP CONSTRAINT "FK_9c552fce3a3f6875ecb51e304a2"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD CONSTRAINT "UQ_7546e717697c4dca6c12ee2601e" UNIQUE ("merchantuserId")`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD CONSTRAINT "FK_7546e717697c4dca6c12ee2601e" FOREIGN KEY ("merchantuserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_role" ALTER COLUMN "businessId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant_role" ADD CONSTRAINT "FK_9c552fce3a3f6875ecb51e304a2" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD "name" character varying NOT NULL`);
    }

}
