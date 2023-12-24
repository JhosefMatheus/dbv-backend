-- CreateTable
CREATE TABLE `role_grant` (
    `role_granting_id` INTEGER NOT NULL,
    `role_granted_id` INTEGER NOT NULL,

    PRIMARY KEY (`role_granting_id`, `role_granted_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `role_grant` ADD CONSTRAINT `role_grant_role_granting_id_fkey` FOREIGN KEY (`role_granting_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_grant` ADD CONSTRAINT `role_grant_role_granted_id_fkey` FOREIGN KEY (`role_granted_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
