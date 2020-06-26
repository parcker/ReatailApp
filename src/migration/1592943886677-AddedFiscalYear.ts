import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedFiscalYear1592943886677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "fiscal_year" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startdate" TIMESTAMP NOT NULL, "enddate" TIMESTAMP NOT NULL, "iscurrent" boolean NOT NULL, "name" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_72fa5ea3e6b0ec7542c23bf0389" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" ADD CONSTRAINT "FK_cf660d096a723848bafa34e6506" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fiscal_year" DROP CONSTRAINT "FK_cf660d096a723848bafa34e6506"`);
        await queryRunner.query(`DROP TABLE "fiscal_year"`);
    }

}
