import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedUserTablemigrations1567533816314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_78725ac7117e7526e028014606` ON `users`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `age`");
        await queryRunner.query("ALTER TABLE `users` ADD `username` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `emailConfirmed` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `passwordHash` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `securityStamp` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `twoFactorEnable` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `accessFailedCount` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `accessFailedCount`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `twoFactorEnable`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `securityStamp`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `passwordHash`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `emailConfirmed`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `username`");
        await queryRunner.query("ALTER TABLE `users` ADD `age` int NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_78725ac7117e7526e028014606` ON `users` (`businessId`)");
    }

}
