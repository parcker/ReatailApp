import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTablePasswordMigration1567952366228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `password`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `password` varchar(255) NOT NULL");
    }

}
