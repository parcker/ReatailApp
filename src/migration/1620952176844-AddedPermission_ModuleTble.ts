import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPermissionModuleTble1620952176844 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "merchant_module" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "deletedby" character varying(300), "approvedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_575c41a1420cc91273a55af53e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "merchant_permission" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "deletedby" character varying(300), "approvedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "CanDelete" boolean NOT NULL, "CanCreate" boolean NOT NULL, "CanUpdate" boolean NOT NULL, "CanView" boolean NOT NULL, "CanApprove" boolean NOT NULL, "CanReject" boolean NOT NULL, "CanUpload" boolean NOT NULL, "CanDownLoad" boolean NOT NULL, CONSTRAINT "PK_ba57e186c59a0a4de9d5410149e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "merchant_permission"`);
        await queryRunner.query(`DROP TABLE "merchant_module"`);
    }

}
