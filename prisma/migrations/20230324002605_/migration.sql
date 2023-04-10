/*
  Warnings:

  - You are about to drop the column `descrription` on the `firesensor` table. All the data in the column will be lost.
  - You are about to drop the column `descrription` on the `firesystem` table. All the data in the column will be lost.
  - Added the required column `description` to the `FireSensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `FireSystem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `firesensor` DROP COLUMN `descrription`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `firesystem` DROP COLUMN `descrription`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `users_verificationCodeAt_idx` ON `users`(`verificationCodeAt`);
