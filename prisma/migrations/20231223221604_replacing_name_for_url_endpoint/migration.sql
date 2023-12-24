/*
  Warnings:

  - You are about to drop the column `name` on the `endpoint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url,method]` on the table `endpoint` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `endpoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `endpoint_name_method_key` ON `endpoint`;

-- AlterTable
ALTER TABLE `endpoint` DROP COLUMN `name`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `endpoint_url_method_key` ON `endpoint`(`url`, `method`);
