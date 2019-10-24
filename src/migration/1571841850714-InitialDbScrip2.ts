import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDbScrip21571841850714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "emailConfirmed" boolean NOT NULL, "password" character varying NOT NULL, "twoFactorEnable" boolean NOT NULL, "accessFailedCount" integer NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isDisabled" boolean NOT NULL, "phonenumber" character varying NOT NULL, "businessId" uuid, CONSTRAINT "REL_78725ac7117e7526e028014606" UNIQUE ("businessId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "logoPath" character varying NOT NULL, "IsActive" boolean NOT NULL, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "business_location" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "IsActive" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_3288cfb92c9598363f830e1a56b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_user" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "roleId" uuid, CONSTRAINT "REL_2a23ceb75c7511d0523c4aaf49" UNIQUE ("userId"), CONSTRAINT "REL_89e55dae19555d0d5fe8602b28" UNIQUE ("roleId"), CONSTRAINT "PK_e3583d40265174efd29754a7c57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application_route" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "description" character varying NOT NULL, "Type" integer NOT NULL, CONSTRAINT "PK_67f2c7f0076c385064ff999c572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_premission" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "applicationrouteId" uuid, CONSTRAINT "PK_3e3e1285eceb06bdae73d70564c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_78725ac7117e7526e028014606b" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business_location" ADD CONSTRAINT "FK_46df66863ec4dac6a3572765220" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_89e55dae19555d0d5fe8602b281" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_premission" ADD CONSTRAINT "FK_11d81560c95f356256b89c0f27f" FOREIGN KEY ("applicationrouteId") REFERENCES "application_route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_premission" DROP CONSTRAINT "FK_11d81560c95f356256b89c0f27f"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_89e55dae19555d0d5fe8602b281"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_2a23ceb75c7511d0523c4aaf492"`);
        await queryRunner.query(`ALTER TABLE "business_location" DROP CONSTRAINT "FK_46df66863ec4dac6a3572765220"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_78725ac7117e7526e028014606b"`);
        await queryRunner.query(`DROP TABLE "user_premission"`);
        await queryRunner.query(`DROP TABLE "application_route"`);
        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "business_location"`);
        await queryRunner.query(`DROP TABLE "business"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
