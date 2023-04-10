-- AlterTable
ALTER TABLE `building` ADD COLUMN `customerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Building` ADD CONSTRAINT `Building_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
