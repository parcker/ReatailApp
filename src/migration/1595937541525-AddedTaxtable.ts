import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTaxtable1595937541525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tax" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "code" character varying NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_2c1e62c595571139e2fb0e9c319" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "tax"`);
    }

}
