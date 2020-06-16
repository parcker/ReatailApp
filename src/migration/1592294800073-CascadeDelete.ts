import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeDelete1592294800073 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP CONSTRAINT "FK_dd60910c632f58d804c029e03a2"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_beb436344a3af6611cbfac22e7b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_463d24f6d4905c488bd509164e6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_8b95800811275dd98a888044d50"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_99a26d343738525a71710e1b898"`);
        await queryRunner.query(`DROP INDEX "IDX_dd60910c632f58d804c029e03a"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP CONSTRAINT "REL_dd60910c632f58d804c029e03a"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" ADD "extracolum" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_463d24f6d4905c488bd509164e6" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_8b95800811275dd98a888044d50" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_beb436344a3af6611cbfac22e7b" FOREIGN KEY ("productconfigurationId") REFERENCES "product_configuration"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_99a26d343738525a71710e1b898" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_99a26d343738525a71710e1b898"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_beb436344a3af6611cbfac22e7b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_8b95800811275dd98a888044d50"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_463d24f6d4905c488bd509164e6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "price_configuration" DROP COLUMN "extracolum"`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD CONSTRAINT "REL_dd60910c632f58d804c029e03a" UNIQUE ("productId")`);
        await queryRunner.query(`CREATE INDEX "IDX_dd60910c632f58d804c029e03a" ON "product_configuration" ("productId") `);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_99a26d343738525a71710e1b898" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_8b95800811275dd98a888044d50" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_463d24f6d4905c488bd509164e6" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_beb436344a3af6611cbfac22e7b" FOREIGN KEY ("productconfigurationId") REFERENCES "product_configuration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_configuration" ADD CONSTRAINT "FK_dd60910c632f58d804c029e03a2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
