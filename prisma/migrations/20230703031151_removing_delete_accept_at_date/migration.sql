/*
  Warnings:

  - You are about to drop the column `acceptedAt` on the `pendingregister` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `pendingregister` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pendingregister` DROP COLUMN `acceptedAt`,
    DROP COLUMN `deletedAt`;
