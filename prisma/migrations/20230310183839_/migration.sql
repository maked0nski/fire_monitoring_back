/*
  Warnings:

  - The primary key for the `observation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `observation_id` on the `observation` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contact_person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fire_extinguishers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fire_hydrant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fire_resistant_impregnation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sim_card` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Observation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Observation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contact_person` DROP FOREIGN KEY `Contact_person_firmId_fkey`;

-- DropForeignKey
ALTER TABLE `fire_extinguishers` DROP FOREIGN KEY `Fire_extinguishers_firmId_fkey`;

-- DropForeignKey
ALTER TABLE `fire_hydrant` DROP FOREIGN KEY `Fire_hydrant_firmId_fkey`;

-- DropForeignKey
ALTER TABLE `fire_resistant_impregnation` DROP FOREIGN KEY `Fire_resistant_impregnation_firmId_fkey`;

-- DropForeignKey
ALTER TABLE `observation` DROP FOREIGN KEY `Observation_firmId_key`;

-- DropForeignKey
ALTER TABLE `observation` DROP FOREIGN KEY `Observation_sim_cardNumber_fkey`;

-- DropIndex
DROP INDEX `Observation_observation_id_key` ON `observation`;

-- AlterTable
ALTER TABLE `observation` DROP PRIMARY KEY,
    DROP COLUMN `observation_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `contact_person`;

-- DropTable
DROP TABLE `fire_extinguishers`;

-- DropTable
DROP TABLE `fire_hydrant`;

-- DropTable
DROP TABLE `fire_resistant_impregnation`;

-- DropTable
DROP TABLE `sim_card`;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Building` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `coordinate` VARCHAR(191) NULL,
    `service_contract` VARCHAR(191) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactPerson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted_element` BOOLEAN NOT NULL DEFAULT false,
    `firmId` INTEGER NULL,
    `buildingId` INTEGER NULL,

    INDEX `Contact_person_customerId_fkey`(`firmId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FireExtinguishers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `next_check` VARCHAR(191) NOT NULL,
    `who_checked` VARCHAR(191) NULL,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `buildingId` INTEGER NULL,

    INDEX `Fire_extinguishers_buildingId_fkey`(`buildingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FireHydrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `next_check` DATETIME(3) NOT NULL,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `who_checked` VARCHAR(191) NULL,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `buildingId` INTEGER NULL,

    UNIQUE INDEX `Fire_hydrant_buildingId_fkey`(`buildingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FireResistantImpregnation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area` INTEGER NOT NULL,
    `seepage_liquid` VARCHAR(191) NOT NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `project_file_link` VARCHAR(191) NULL,
    `who_checked` VARCHAR(191) NULL,
    `buildingId` INTEGER NULL,

    UNIQUE INDEX `Fire_resistant_impregnation_buildingId_key`(`buildingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FireAlarm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `installation_date` VARCHAR(191) NULL,
    `project_file_link` VARCHAR(191) NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `device_state` VARCHAR(191) NOT NULL,
    `number_sensors` VARCHAR(191) NULL,
    `buildingId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FireSystem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NULL,
    `manual_link` VARCHAR(191) NULL,
    `zones` VARCHAR(191) NOT NULL,
    `descrription` VARCHAR(191) NOT NULL,
    `fireAlarmId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FireSensor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `descrription` VARCHAR(191) NOT NULL,
    `manual_link` VARCHAR(191) NULL,
    `fireAlarmId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SimCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `operator` VARCHAR(191) NOT NULL DEFAULT 'kyivstar',
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Sim_card_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Observation_id_key` ON `Observation`(`id`);

-- AddForeignKey
ALTER TABLE `ContactPerson` ADD CONSTRAINT `Contact_person_customerId_fkey` FOREIGN KEY (`firmId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactPerson` ADD CONSTRAINT `ContactPerson_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FireExtinguishers` ADD CONSTRAINT `Fire_extinguishers_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FireHydrant` ADD CONSTRAINT `Fire_hydrant_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FireResistantImpregnation` ADD CONSTRAINT `Fire_resistant_impregnation_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FireAlarm` ADD CONSTRAINT `FireAlarm_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FireSystem` ADD CONSTRAINT `FireSystem_fireAlarmId_fkey` FOREIGN KEY (`fireAlarmId`) REFERENCES `FireAlarm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FireSensor` ADD CONSTRAINT `FireSensor_fireAlarmId_fkey` FOREIGN KEY (`fireAlarmId`) REFERENCES `FireAlarm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_sim_cardNumber_fkey` FOREIGN KEY (`sim_cardNumber`) REFERENCES `SimCard`(`number`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_firmId_key` FOREIGN KEY (`firmId`) REFERENCES `Building`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
