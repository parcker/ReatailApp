import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedUserTableMigrations1566466029052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `isDisabled` tinyint NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `isDisabled`");
    }

}
