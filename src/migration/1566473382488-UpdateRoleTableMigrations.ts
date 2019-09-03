import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRoleTableMigrations1566473382488 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `role` CHANGE `email` `name` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `role` CHANGE `name` `email` varchar(255) NOT NULL");
    }

}
