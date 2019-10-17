import {MigrationInterface, QueryRunner} from "typeorm";

export class BusinessLocationScript1571041651435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "business_location" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "IsActive" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "businessId" uuid, CONSTRAINT "REL_46df66863ec4dac6a357276522" UNIQUE ("businessId"), CONSTRAINT "PK_3288cfb92c9598363f830e1a56b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "business" ADD "logoPath" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "business_location" ADD CONSTRAINT "FK_46df66863ec4dac6a3572765220" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "business_location" DROP CONSTRAINT "FK_46df66863ec4dac6a3572765220"`);
        await queryRunner.query(`ALTER TABLE "business" DROP COLUMN "logoPath"`);
        await queryRunner.query(`DROP TABLE "business_location"`);
    }

}
