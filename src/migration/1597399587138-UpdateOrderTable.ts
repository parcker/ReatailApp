import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOrderTable1597399587138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba"`);
        await queryRunner.query(`CREATE TABLE "price_audit_log" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL DEFAULT true, "createdby" character varying(300), "updatedby" character varying(300), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" character varying NOT NULL, "oldpriceinfo" character varying NOT NULL, "newpriceinfo" character varying NOT NULL, CONSTRAINT "PK_be6e5f402708a15384e8a8fbbec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_054d38519ab678499352a03e95" ON "price_audit_log" ("productId") `);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "postingTypeId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "isconfirmed"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "confirmedbyId"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "qty"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "previousqty"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "qty"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "ispromo"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "extracolum"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "paymenttermId" character varying`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "transactionstatusId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "doctypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "ctnqty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "unitqty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "retailcost" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "wholesalecost" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "wholesaleprice" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "markup" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "unitcostprice" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "retailsellingprice" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "wholesalecostprice" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "wholesalesellingprice" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "anyretaildiscount" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "anywholediscount" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "discountype" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "retaildiscountvalue" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "wholesalediscountvalue" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ALTER COLUMN "Active" SET DEFAULT true`);
        await queryRunner.query(`CREATE INDEX "IDX_002f91d18a7e560b970952e20f" ON "sales" ("paymenttermId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_002f91d18a7e560b970952e20f"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ALTER COLUMN "Active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "wholesalediscountvalue"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "retaildiscountvalue"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "discountype"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "anywholediscount"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "anyretaildiscount"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "wholesalesellingprice"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "wholesalecostprice"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "retailsellingprice"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "unitcostprice"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "markup"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "wholesaleprice"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "wholesalecost"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "retailcost"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "unitqty"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "ctnqty"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "doctypeId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "transactionstatusId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "paymenttermId"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "extracolum" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "end" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "start" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "ispromo" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "qty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "previousqty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "cost" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "qty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "confirmedbyId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "isconfirmed" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "postingTypeId" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_054d38519ab678499352a03e95"`);
        await queryRunner.query(`DROP TABLE "price_audit_log"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_30c5823ab097ed3bb2ff019e3ba" FOREIGN KEY ("confirmedbyId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
