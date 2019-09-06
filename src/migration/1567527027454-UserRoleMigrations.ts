import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRoleMigrations1567527027454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `age` int NOT NULL, `isDisabled` tinyint NOT NULL, `phonenumber` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`date_created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `date_updateded` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role_user` (`date_created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `date_updateded` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `userId` int NULL, `roleId` varchar(36) NULL, UNIQUE INDEX `REL_2a23ceb75c7511d0523c4aaf49` (`userId`), UNIQUE INDEX `REL_89e55dae19555d0d5fe8602b28` (`roleId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `role_user` ADD CONSTRAINT `FK_2a23ceb75c7511d0523c4aaf492` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `role_user` ADD CONSTRAINT `FK_89e55dae19555d0d5fe8602b281` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `role_user` DROP FOREIGN KEY `FK_89e55dae19555d0d5fe8602b281`");
        await queryRunner.query("ALTER TABLE `role_user` DROP FOREIGN KEY `FK_2a23ceb75c7511d0523c4aaf492`");
        await queryRunner.query("DROP INDEX `REL_89e55dae19555d0d5fe8602b28` ON `role_user`");
        await queryRunner.query("DROP INDEX `REL_2a23ceb75c7511d0523c4aaf49` ON `role_user`");
        await queryRunner.query("DROP TABLE `role_user`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
