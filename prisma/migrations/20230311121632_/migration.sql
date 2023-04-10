/*
  Warnings:

  - You are about to drop the column `deleted_element` on the `contactperson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contactperson` DROP COLUMN `deleted_element`,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- RenameIndex
ALTER TABLE `simcard` RENAME INDEX `Sim_card_number_key` TO `SimCard_number_key`;
