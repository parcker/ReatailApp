import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedSalesTable1597052274681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "sales_items" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" character varying NOT NULL, "warehouseId" character varying NOT NULL, "taxValue" integer NOT NULL, "tax" integer NOT NULL, "unitQty" integer NOT NULL, "ctnQty" integer NOT NULL, "price" integer NOT NULL, "lineamount" integer NOT NULL, "saledetailId" uuid, CONSTRAINT "PK_534cb3df276d77c81b1234c02b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "additionalinfo" character varying`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "deliveryDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "total" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "subTotal" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "taxTotal" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "totalcharges" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "chargesinfo" character varying`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "level" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "type" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "sales_items" ADD CONSTRAINT "FK_138fce203d22285907d817b1791" FOREIGN KEY ("saledetailId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sales_items" DROP CONSTRAINT "FK_138fce203d22285907d817b1791"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "chargesinfo"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "totalcharges"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "taxTotal"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "subTotal"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "deliveryDate"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "additionalinfo"`);
        await queryRunner.query(`DROP TABLE "sales_items"`);
    }

}
