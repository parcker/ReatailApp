import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSetup1591539702667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_4d0a5194036944128ec86583084"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_32b6011b7ad5cb5f5096b8f7f09"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_7f744b8c2bdab4a97c1d6306b72"`);
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "businessId" TO "businesslocationId"`);
        await queryRunner.query(`ALTER TABLE "supplier" RENAME COLUMN "businessId" TO "businesslocationId"`);
        await queryRunner.query(`CREATE TABLE "sales" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "IsActive" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customerId" uuid, "businesslocationId" uuid, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3a92cf6add00043cef9833db1c" ON "sales" ("customerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb98ebb1d41a945ac43aa75d9f" ON "sales" ("businesslocationId") `);
        await queryRunner.query(`CREATE TABLE "store_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "instockqty" integer NOT NULL, "committedqty" integer NOT NULL, "orderedqty" integer NOT NULL, "availableqty" integer NOT NULL, "businesslocationId" uuid, "productId" uuid, CONSTRAINT "PK_de6af3a8762c59860794f42d8f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ba44c296693b083792742c73c5" ON "store_product" ("businesslocationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13e275149d7414c2694da12dcf" ON "store_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "product_configuration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pack" integer NOT NULL, "leadtime" integer NOT NULL, "canexpire" boolean NOT NULL, "canbesold" boolean NOT NULL, "canbepurchased" boolean NOT NULL, "anypromo" boolean NOT NULL, "productId" uuid, CONSTRAINT "PK_234f05214d60c49e9a673bd7e2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd60910c632f58d804c029e03a" ON "product_configuration" ("productId") `);
        await queryRunner.query(`CREATE TABLE "price_configuration" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "IsActive" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qty" integer NOT NULL, "price" integer NOT NULL, "ispromo" boolean NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "productId" uuid, CONSTRAINT "PK_cc0a28c08c385d20508c19d71cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3beed5d4b57fd35b1dc80921b" ON "price_configuration" ("productId") `);
        await queryRunner.query(`CREATE TABLE "stock_transfer" ("dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP NOT NULL DEFAULT now(), "isDisabled" boolean NOT NULL, "createdby" character varying NOT NULL, "updatedby" character varying NOT NULL, "IsActive" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transfertype" integer NOT NULL, "businesslocationFromId" uuid, "businesslocationToId" uuid, CONSTRAINT "PK_b6165ea3cc5b8062e7eaa1bd44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6897e007b1f7d24060183c457c" ON "stock_transfer" ("transfertype") `);
        await queryRunner.query(`CREATE INDEX "IDX_b48373f86aa3a9375fba0763d7" ON "stock_transfer" ("businesslocationFromId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b7e00f224d2baaaa80bad4454" ON "stock_transfer" ("businesslocationToId") `);
        await queryRunner.query(`CREATE TABLE "unit_of_stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_5960061921d6bbefcff53d4412d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "businessId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "packingtype"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "packs"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "expiredenabled"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "costprice"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sellingprice"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "markuprate"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "ispurchaseitem"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "issalesitem"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "imagelink" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_3a92cf6add00043cef9833db1cd" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_bb98ebb1d41a945ac43aa75d9f4" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_0233f7239d820ca88cbf8271187" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_3e709ce06a9e3ccd49d8c913bce" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_ba44c296693b083792742c73c51" FOREIGN KEY ("businesslocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_13e275149d7414c2694da12dcf7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD CONSTRAINT "FK_dd60910c632f58d804c029e03a2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD CONSTRAINT "FK_b3beed5d4b57fd35b1dc80921bc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD CONSTRAINT "FK_b48373f86aa3a9375fba0763d76" FOREIGN KEY ("businesslocationFromId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" ADD CONSTRAINT "FK_3b7e00f224d2baaaa80bad4454a" FOREIGN KEY ("businesslocationToId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP CONSTRAINT "FK_3b7e00f224d2baaaa80bad4454a"`);
        await queryRunner.query(`ALTER TABLE "stock_transfer" DROP CONSTRAINT "FK_b48373f86aa3a9375fba0763d76"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP CONSTRAINT "FK_b3beed5d4b57fd35b1dc80921bc"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP CONSTRAINT "FK_dd60910c632f58d804c029e03a2"`);
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_13e275149d7414c2694da12dcf7"`);
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_ba44c296693b083792742c73c51"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_3e709ce06a9e3ccd49d8c913bce"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_0233f7239d820ca88cbf8271187"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_bb98ebb1d41a945ac43aa75d9f4"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_3a92cf6add00043cef9833db1cd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imagelink"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "issalesitem" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "ispurchaseitem" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "markuprate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "sellingprice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "costprice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "expiredenabled" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "packs" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "packingtype" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "businessId" uuid`);
        await queryRunner.query(`DROP TABLE "unit_of_stock"`);
        await queryRunner.query(`DROP INDEX "IDX_3b7e00f224d2baaaa80bad4454"`);
        await queryRunner.query(`DROP INDEX "IDX_b48373f86aa3a9375fba0763d7"`);
        await queryRunner.query(`DROP INDEX "IDX_6897e007b1f7d24060183c457c"`);
        await queryRunner.query(`DROP TABLE "stock_transfer"`);
        await queryRunner.query(`DROP INDEX "IDX_b3beed5d4b57fd35b1dc80921b"`);
        await queryRunner.query(`DROP TABLE "price_configuration"`);
        await queryRunner.query(`DROP INDEX "IDX_dd60910c632f58d804c029e03a"`);
        await queryRunner.query(`DROP TABLE "product_configuration"`);
        await queryRunner.query(`DROP INDEX "IDX_13e275149d7414c2694da12dcf"`);
        await queryRunner.query(`DROP INDEX "IDX_ba44c296693b083792742c73c5"`);
        await queryRunner.query(`DROP TABLE "store_product"`);
        await queryRunner.query(`DROP INDEX "IDX_bb98ebb1d41a945ac43aa75d9f"`);
        await queryRunner.query(`DROP INDEX "IDX_3a92cf6add00043cef9833db1c"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`ALTER TABLE "supplier" RENAME COLUMN "businesslocationId" TO "businessId"`);
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "businesslocationId" TO "businessId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_7f744b8c2bdab4a97c1d6306b72" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_32b6011b7ad5cb5f5096b8f7f09" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_4d0a5194036944128ec86583084" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
