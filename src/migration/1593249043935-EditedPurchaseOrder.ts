import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedPurchaseOrder1593249043935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "fiscal_year" DROP CONSTRAINT "FK_cf660d096a723848bafa34e6506"`);
        await queryRunner.query(`CREATE TABLE "purchase_order_payment" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paymenttype" character varying NOT NULL, "paymentdate" character varying NOT NULL, "amountpaid" integer NOT NULL, "balnce" integer NOT NULL, "purchaseorderId" uuid, CONSTRAINT "PK_a2c68765d2cefbbbbaf92e6fa00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_mode" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_28d86a39aa07b1ad6809174fbff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_term" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "noofdays" integer NOT NULL, "businessId" uuid, CONSTRAINT "PK_e06d6ccc9db17416919b5f46d6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "inputedinvoiceNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "transactionstatusId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "doctypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "dueDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "postingTypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "shipbusinesslocationId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "fiscalyearId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "orderpaymentId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" ADD CONSTRAINT "FK_4db7c4be694446aa291e695bc0b" FOREIGN KEY ("purchaseorderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_a8afceeb2a99d891e827fbd5d90" FOREIGN KEY ("shipbusinesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_de643531a0174b5dc8284ee61bc" FOREIGN KEY ("fiscalyearId") REFERENCES "fiscal_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_a29607c1e4d5dc5fb7a99449f07" FOREIGN KEY ("orderpaymentId") REFERENCES "purchase_order_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_mode" ADD CONSTRAINT "FK_868a036fe6b6d9f022fcaecca37" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_term" ADD CONSTRAINT "FK_17cd4d29823ef76a3c2f0149dd7" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "payment_term" DROP CONSTRAINT "FK_17cd4d29823ef76a3c2f0149dd7"`);
        await queryRunner.query(`ALTER TABLE "payment_mode" DROP CONSTRAINT "FK_868a036fe6b6d9f022fcaecca37"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_a29607c1e4d5dc5fb7a99449f07"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_de643531a0174b5dc8284ee61bc"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_a8afceeb2a99d891e827fbd5d90"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" DROP CONSTRAINT "FK_4db7c4be694446aa291e695bc0b"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "orderpaymentId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "fiscalyearId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "shipbusinesslocationId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "postingTypeId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "doctypeId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "transactionstatusId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "inputedinvoiceNumber"`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" ADD "businessId" uuid`);
        await queryRunner.query(`DROP TABLE "payment_term"`);
        await queryRunner.query(`DROP TABLE "payment_mode"`);
        await queryRunner.query(`DROP TABLE "purchase_order_payment"`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" ADD CONSTRAINT "FK_cf660d096a723848bafa34e6506" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
