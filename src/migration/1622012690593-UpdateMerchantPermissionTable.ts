import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateMerchantPermissionTable1622012690593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_permission" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "merchant_role" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD "merchantuserId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD CONSTRAINT "UQ_7546e717697c4dca6c12ee2601e" UNIQUE ("merchantuserId")`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD "merchantroleId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_module" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" ADD "moduleId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" ADD "businessId" uuid`);
        await queryRunner.query(`ALTER TABLE "merchant_role" ADD CONSTRAINT "FK_9c552fce3a3f6875ecb51e304a2" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD CONSTRAINT "FK_237ea0bc1e9313882d09d8da84c" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD CONSTRAINT "FK_7546e717697c4dca6c12ee2601e" FOREIGN KEY ("merchantuserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" ADD CONSTRAINT "FK_9a03f711a6bf91cf81ac6553617" FOREIGN KEY ("merchantroleId") REFERENCES "merchant_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_module" ADD CONSTRAINT "FK_28ef0209c7dd7ccdd673ab8e711" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" ADD CONSTRAINT "FK_a5e04d97393a6fc17d1579fa8f0" FOREIGN KEY ("moduleId") REFERENCES "merchant_module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" ADD CONSTRAINT "FK_8770d233f09706a565791123f3f" FOREIGN KEY ("roleId") REFERENCES "merchant_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" ADD CONSTRAINT "FK_41cb9a1d30dd176f8128eeaf6e9" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "merchant_permission" DROP CONSTRAINT "FK_41cb9a1d30dd176f8128eeaf6e9"`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" DROP CONSTRAINT "FK_8770d233f09706a565791123f3f"`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" DROP CONSTRAINT "FK_a5e04d97393a6fc17d1579fa8f0"`);
        await queryRunner.query(`ALTER TABLE "merchant_module" DROP CONSTRAINT "FK_28ef0209c7dd7ccdd673ab8e711"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP CONSTRAINT "FK_9a03f711a6bf91cf81ac6553617"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP CONSTRAINT "FK_7546e717697c4dca6c12ee2601e"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP CONSTRAINT "FK_237ea0bc1e9313882d09d8da84c"`);
        await queryRunner.query(`ALTER TABLE "merchant_role" DROP CONSTRAINT "FK_9c552fce3a3f6875ecb51e304a2"`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" DROP COLUMN "moduleId"`);
        await queryRunner.query(`ALTER TABLE "merchant_module" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP COLUMN "merchantroleId"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP CONSTRAINT "UQ_7546e717697c4dca6c12ee2601e"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP COLUMN "merchantuserId"`);
        await queryRunner.query(`ALTER TABLE "merchant_role_user" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "merchant_role" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "merchant_permission" ADD "name" character varying NOT NULL`);
    }

}
