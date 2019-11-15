import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptPartnerandCustomerTB1573808062514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "customer" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying NOT NULL, "mobilenumber" character varying NOT NULL, "email" character varying NOT NULL, "gender" boolean NOT NULL, "age" integer NOT NULL, "birthday" integer NOT NULL, "birthmonth" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyname" character varying NOT NULL, "mobilenumber" character varying NOT NULL, "email" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_4d0a5194036944128ec86583084" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_32b6011b7ad5cb5f5096b8f7f09" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_32b6011b7ad5cb5f5096b8f7f09"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_4d0a5194036944128ec86583084"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
