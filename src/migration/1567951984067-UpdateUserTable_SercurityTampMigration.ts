import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTableSercurityTampMigration1567951984067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `securityStamp`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `securityStamp` varchar(255) NOT NULL");
    }

}
