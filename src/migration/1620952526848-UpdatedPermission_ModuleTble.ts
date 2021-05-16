import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedPermissionModuleTble1620952526848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "merchant_role" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "deletedby" character varying(300), "approvedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_92612bb4713be57eaf658e39903" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "merchant_role_user" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "deletedby" character varying(300), "approvedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_5220a7bffbb8b470ec7f7ad3e54" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "merchant_role_user"`);
        await queryRunner.query(`DROP TABLE "merchant_role"`);
    }

}
