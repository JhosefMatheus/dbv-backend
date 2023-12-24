-- AlterTable
ALTER TABLE `endpoint` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `role` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `role_endpoint` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `updatedAt` DATETIME(3) NULL;
