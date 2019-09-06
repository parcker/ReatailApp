import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTableBusinessTableMigrations1567528297247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `business` (`date_created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `date_updateded` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD `businessId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_78725ac7117e7526e028014606` (`businessId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_78725ac7117e7526e028014606` ON `users` (`businessId`)");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_78725ac7117e7526e028014606b` FOREIGN KEY (`businessId`) REFERENCES `business`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_78725ac7117e7526e028014606b`");
        await queryRunner.query("DROP INDEX `REL_78725ac7117e7526e028014606` ON `users`");
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_78725ac7117e7526e028014606`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `businessId`");
        await queryRunner.query("DROP TABLE `business`");
    }

}
