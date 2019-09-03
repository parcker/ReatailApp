import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedPrixMigrations1566462353874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `Prix`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `Prix` varchar(255) NOT NULL");
    }

}
