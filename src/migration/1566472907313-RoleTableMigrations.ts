import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleTableMigrations1566472907313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `role` (`date_created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `date_updateded` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `role`");
    }

}
