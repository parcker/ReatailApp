import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedPurshaseOrderNuallableFields1593374946738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "purchase_order" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" SERIAL NOT NULL, "invoiceNumber" character varying NOT NULL, "inputedinvoiceNumber" character varying, "totalcostprice" integer, "transactionstatusId" integer NOT NULL, "doctypeId" integer NOT NULL, "dueDate" TIMESTAMP NOT NULL, "postingTypeId" integer NOT NULL, "isconfirmed" boolean NOT NULL, "businesslocationId" uuid, "shipbusinesslocationId" uuid, "supplierId" uuid, "fiscalyearId" uuid, "orderpaymentId" uuid, "confirmedbyId" uuid, "businessId" uuid, CONSTRAINT "PK_ad3e1c7b862f4043b103a6c8c60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" DROP COLUMN "purchaseorderId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" ADD "purchaseorderId" integer`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "purchaseorderId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "purchaseorderId" integer`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" ADD CONSTRAINT "FK_4db7c4be694446aa291e695bc0b" FOREIGN KEY ("purchaseorderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e1b82a8d4458efc555463c73b87" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_a8afceeb2a99d891e827fbd5d90" FOREIGN KEY ("shipbusinesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e4ea5841622429c12889a487f31" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_de643531a0174b5dc8284ee61bc" FOREIGN KEY ("fiscalyearId") REFERENCES "fiscal_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_a29607c1e4d5dc5fb7a99449f07" FOREIGN KEY ("orderpaymentId") REFERENCES "purchase_order_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba" FOREIGN KEY ("confirmedbyId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_692d6d35b8f74bccf22f154c942" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_3c2a4c8feebcfa37da0ea85dfab" FOREIGN KEY ("purchaseorderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_3c2a4c8feebcfa37da0ea85dfab"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_692d6d35b8f74bccf22f154c942"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_a29607c1e4d5dc5fb7a99449f07"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_de643531a0174b5dc8284ee61bc"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e4ea5841622429c12889a487f31"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_a8afceeb2a99d891e827fbd5d90"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e1b82a8d4458efc555463c73b87"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" DROP CONSTRAINT "FK_4db7c4be694446aa291e695bc0b"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "purchaseorderId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "purchaseorderId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" DROP COLUMN "purchaseorderId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" ADD "purchaseorderId" uuid`);
        await queryRunner.query(`DROP TABLE "purchase_order"`);
    }

}
