import {MigrationInterface, QueryRunner} from "typeorm";

export class scriptCategorySubcategory1573209774969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "category" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "businesslocationId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_category" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "categoryId" uuid, "businesslocationId" uuid, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_7974e12e95204b0e09a086220f6" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_9b467788db5200b9a234515d4aa" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_9b467788db5200b9a234515d4aa"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_7974e12e95204b0e09a086220f6"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
