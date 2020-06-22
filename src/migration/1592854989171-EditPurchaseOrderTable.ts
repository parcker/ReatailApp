import {MigrationInterface, QueryRunner} from "typeorm";

export class EditPurchaseOrderTable1592854989171 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_payment" DROP CONSTRAINT "FK_8e5de5355bcad91a7769f16504c"`);
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "orderId" TO "purchaseorderId"`);
        await queryRunner.query(`ALTER TABLE "order_payment" RENAME COLUMN "orderId" TO "purchaseorderId"`);
        await queryRunner.query(`CREATE TABLE "purchase_order" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoiceNumber" character varying NOT NULL, "orderstatus" integer NOT NULL, "totalcostprice" integer NOT NULL, "businesslocationId" uuid, "supplierId" uuid, CONSTRAINT "PK_ad3e1c7b862f4043b103a6c8c60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e1b82a8d4458efc555463c73b87" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e4ea5841622429c12889a487f31" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_3c2a4c8feebcfa37da0ea85dfab" FOREIGN KEY ("purchaseorderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_payment" ADD CONSTRAINT "FK_ce4c5492304b6e4e260653bb888" FOREIGN KEY ("purchaseorderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_payment" DROP CONSTRAINT "FK_ce4c5492304b6e4e260653bb888"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_3c2a4c8feebcfa37da0ea85dfab"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e4ea5841622429c12889a487f31"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e1b82a8d4458efc555463c73b87"`);
        await queryRunner.query(`DROP TABLE "purchase_order"`);
        await queryRunner.query(`ALTER TABLE "order_payment" RENAME COLUMN "purchaseorderId" TO "orderId"`);
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "purchaseorderId" TO "orderId"`);
        await queryRunner.query(`ALTER TABLE "order_payment" ADD CONSTRAINT "FK_8e5de5355bcad91a7769f16504c" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
