/*
  Warnings:

  - You are about to drop the column `city` on the `building` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `building` DROP COLUMN `city`,
    ADD COLUMN `description` VARCHAR(191) NULL;
