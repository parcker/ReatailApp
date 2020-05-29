import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptAddedBusinessLocationUserTable1573631762456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "business_location_user" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "businesslocationId" uuid, "userId" uuid, CONSTRAINT "PK_868d891a99a2d946bd2c01d2668" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "business_location_user" ADD CONSTRAINT "FK_81e8aa7e586ffc4862872288b7c" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "business_location_user" ADD CONSTRAINT "FK_98fe6a097afff52cc681753147d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "business_location_user" DROP CONSTRAINT "FK_98fe6a097afff52cc681753147d"`);
        await queryRunner.query(`ALTER TABLE "business_location_user" DROP CONSTRAINT "FK_81e8aa7e586ffc4862872288b7c"`);
        await queryRunner.query(`DROP TABLE "business_location_user"`);
    }

}
