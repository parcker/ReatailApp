import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedUserTableMigration1566403826397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `Prix` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `Prix`");
    }

}
