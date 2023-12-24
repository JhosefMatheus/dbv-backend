/*
  Warnings:

  - A unique constraint covering the columns `[name,method]` on the table `endpoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `method` to the `endpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `endpoint` ADD COLUMN `method` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `endpoint_name_method_key` ON `endpoint`(`name`, `method`);

-- CreateIndex
CREATE UNIQUE INDEX `role_name_key` ON `role`(`name`);
