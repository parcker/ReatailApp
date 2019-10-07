import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseInitialization1570480486002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `business` (`dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `dateUpdated`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `IsActive` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `emailConfirmed` tinyint NOT NULL, `password` varchar(255) NOT NULL, `twoFactorEnable` tinyint NOT NULL, `accessFailedCount` int NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `isDisabled` tinyint NOT NULL, `phonenumber` varchar(255) NOT NULL, `businessId` varchar(36) NULL, UNIQUE INDEX `REL_78725ac7117e7526e028014606` (`businessId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `dateUpdated`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role_user` (`dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `dateUpdated`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` varchar(36) NOT NULL, `userId` varchar(36) NULL, `roleId` varchar(36) NULL, UNIQUE INDEX `REL_2a23ceb75c7511d0523c4aaf49` (`userId`), UNIQUE INDEX `REL_89e55dae19555d0d5fe8602b28` (`roleId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_78725ac7117e7526e028014606b` FOREIGN KEY (`businessId`) REFERENCES `business`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `role_user` ADD CONSTRAINT `FK_2a23ceb75c7511d0523c4aaf492` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `role_user` ADD CONSTRAINT `FK_89e55dae19555d0d5fe8602b281` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `role_user` DROP FOREIGN KEY `FK_89e55dae19555d0d5fe8602b281`");
        await queryRunner.query("ALTER TABLE `role_user` DROP FOREIGN KEY `FK_2a23ceb75c7511d0523c4aaf492`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_78725ac7117e7526e028014606b`");
        await queryRunner.query("DROP INDEX `REL_89e55dae19555d0d5fe8602b28` ON `role_user`");
        await queryRunner.query("DROP INDEX `REL_2a23ceb75c7511d0523c4aaf49` ON `role_user`");
        await queryRunner.query("DROP TABLE `role_user`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP INDEX `REL_78725ac7117e7526e028014606` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `business`");
    }

}
