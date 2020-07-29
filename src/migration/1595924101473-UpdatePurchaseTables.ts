import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePurchaseTables1595924101473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_ba44c296693b083792742c73c51"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP CONSTRAINT "FK_b48373f86aa3a9375fba0763d76"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP CONSTRAINT "FK_3b7e00f224d2baaaa80bad4454a"`);
        await queryRunner.query(`DROP INDEX "IDX_ba44c296693b083792742c73c5"`);
        await queryRunner.query(`DROP INDEX "IDX_b48373f86aa3a9375fba0763d7"`);
        await queryRunner.query(`DROP INDEX "IDX_3b7e00f224d2baaaa80bad4454"`);
        await queryRunner.query(`ALTER TABLE "store_product" RENAME COLUMN "businesslocationId" TO "warehouseId"`);
        await queryRunner.query(`CREATE TABLE "purchase_order_payment" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paymenttype" character varying NOT NULL, "paymentdate" character varying NOT NULL, "amountpaid" integer NOT NULL, "balnce" integer NOT NULL, "purchaseorderId" integer, CONSTRAINT "PK_a2c68765d2cefbbbbaf92e6fa00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "address" character varying(200) NOT NULL, "businesslocationId" uuid, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d432f4b34c3cece40f06074418" ON "warehouse" ("businesslocationId") `);
        await queryRunner.query(`CREATE TABLE "purchase_order" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "id" SERIAL NOT NULL, "invoiceNumber" character varying NOT NULL, "inputedinvoiceNumber" character varying, "totalcostprice" numeric, "transactionstatusId" integer NOT NULL, "doctypeId" integer NOT NULL, "dueDate" TIMESTAMP NOT NULL, "postingTypeId" integer NOT NULL, "isconfirmed" boolean NOT NULL, "raisedlocationId" uuid, "shipbusinesslocationId" uuid, "warehouseId" uuid, "supplierId" uuid, "fiscalyearId" uuid, "orderpaymentId" uuid, "confirmedbyId" uuid, "businessId" uuid, CONSTRAINT "PK_ad3e1c7b862f4043b103a6c8c60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qty" integer NOT NULL, "cost" numeric NOT NULL, "unitprice" numeric NOT NULL, "previousqty" integer NOT NULL, "productId" uuid, "purchaseorderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP COLUMN "businesslocationFromId"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP COLUMN "businesslocationToId"`);
        await queryRunner.query(`CREATE INDEX "IDX_0bde1dd50ffb06b3bda228e3eb" ON "store_product" ("warehouseId") `);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" ADD CONSTRAINT "FK_4db7c4be694446aa291e695bc0b" FOREIGN KEY ("purchaseorderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_0bde1dd50ffb06b3bda228e3eb9" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_d432f4b34c3cece40f060744187" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_52161e890bf7888746b4b1d85fe" FOREIGN KEY ("raisedlocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_a8afceeb2a99d891e827fbd5d90" FOREIGN KEY ("shipbusinesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_77b75170ebefbfc68cff2b85166" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e4ea5841622429c12889a487f31" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_de643531a0174b5dc8284ee61bc" FOREIGN KEY ("fiscalyearId") REFERENCES "fiscal_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_a29607c1e4d5dc5fb7a99449f07" FOREIGN KEY ("orderpaymentId") REFERENCES "purchase_order_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba" FOREIGN KEY ("confirmedbyId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_692d6d35b8f74bccf22f154c942" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_3c2a4c8feebcfa37da0ea85dfab" FOREIGN KEY ("purchaseorderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_3c2a4c8feebcfa37da0ea85dfab"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_692d6d35b8f74bccf22f154c942"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_a29607c1e4d5dc5fb7a99449f07"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_de643531a0174b5dc8284ee61bc"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e4ea5841622429c12889a487f31"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_77b75170ebefbfc68cff2b85166"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_a8afceeb2a99d891e827fbd5d90"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_52161e890bf7888746b4b1d85fe"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_d432f4b34c3cece40f060744187"`);
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_0bde1dd50ffb06b3bda228e3eb9"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_payment" DROP CONSTRAINT "FK_4db7c4be694446aa291e695bc0b"`);
        await queryRunner.query(`DROP INDEX "IDX_0bde1dd50ffb06b3bda228e3eb"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD "businesslocationToId" uuid`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD "businesslocationFromId" uuid`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "purchase_order"`);
        await queryRunner.query(`DROP INDEX "IDX_d432f4b34c3cece40f06074418"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP TABLE "purchase_order_payment"`);
        await queryRunner.query(`ALTER TABLE "store_product" RENAME COLUMN "warehouseId" TO "businesslocationId"`);
        await queryRunner.query(`CREATE INDEX "IDX_3b7e00f224d2baaaa80bad4454" ON "stock_transfer" ("businesslocationToId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b48373f86aa3a9375fba0763d7" ON "stock_transfer" ("businesslocationFromId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ba44c296693b083792742c73c5" ON "store_product" ("businesslocationId") `);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD CONSTRAINT "FK_3b7e00f224d2baaaa80bad4454a" FOREIGN KEY ("businesslocationToId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD CONSTRAINT "FK_b48373f86aa3a9375fba0763d76" FOREIGN KEY ("businesslocationFromId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_ba44c296693b083792742c73c51" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
