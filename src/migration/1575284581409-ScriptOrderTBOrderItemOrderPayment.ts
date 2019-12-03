import {MigrationInterface, QueryRunner} from "typeorm";

export class ScriptOrderTBOrderItemOrderPayment1575284581409 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "order" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoiceNumber" character varying NOT NULL, "totalcostprice" integer NOT NULL, "balance" integer NOT NULL, "businessId" uuid, "businesslocationId" uuid, "supplierId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qty" integer NOT NULL, "cost" integer NOT NULL, "unitprice" integer NOT NULL, "previousqty" integer NOT NULL, "productId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_payment" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paymenttype" character varying NOT NULL, "paymentdate" character varying NOT NULL, "amountpaid" integer NOT NULL, "balnce" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_28c756d4fd41223fedfbd2750e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "haspricebench" boolean  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_7f744b8c2bdab4a97c1d6306b72" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8f70b98e1b4157e88dab5903592" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_af5c3fc71f410fb94a613f6b66e" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_payment" ADD CONSTRAINT "FK_8e5de5355bcad91a7769f16504c" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_payment" DROP CONSTRAINT "FK_8e5de5355bcad91a7769f16504c"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_af5c3fc71f410fb94a613f6b66e"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8f70b98e1b4157e88dab5903592"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_7f744b8c2bdab4a97c1d6306b72"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "haspricebench"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "order_payment"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
