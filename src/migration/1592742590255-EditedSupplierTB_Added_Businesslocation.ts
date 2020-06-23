import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedSupplierTBAddedBusinesslocation1592742590255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "supplier" ADD "registeredlocationId" uuid`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_1c6429e4b01ce139810809df29c" FOREIGN KEY ("registeredlocationId") REFERENCES "business_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_1c6429e4b01ce139810809df29c"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "registeredlocationId"`);
    }

}
