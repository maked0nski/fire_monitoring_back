/*
  Warnings:

  - You are about to alter the column `next_check` on the `fire_hydrant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `fire_hydrant` MODIFY `next_check` DATETIME(3) NOT NULL;
