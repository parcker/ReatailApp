import {MigrationInterface, QueryRunner} from "typeorm";

export class stockCardTB1590754623991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "stock_card" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "StockMovementDescription" character varying NOT NULL, "Direction" integer NOT NULL, "businesslocationId" uuid, "productId" uuid, CONSTRAINT "PK_4fbf097977601f59e44eb7e418f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_card" ADD CONSTRAINT "FK_fc8fa788a8128a0c6c01f3e79d9" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_card" ADD CONSTRAINT "FK_023e24d32b48071bda0f9bc5af3" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "stock_card" DROP CONSTRAINT "FK_023e24d32b48071bda0f9bc5af3"`);
        await queryRunner.query(`ALTER TABLE "stock_card" DROP CONSTRAINT "FK_fc8fa788a8128a0c6c01f3e79d9"`);
        await queryRunner.query(`DROP TABLE "stock_card"`);
    }

}
