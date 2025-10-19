-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Optimization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asin` VARCHAR(191) NOT NULL,
    `originalTitle` TEXT NOT NULL,
    `optimizedTitle` TEXT NOT NULL,
    `originalBullets` TEXT NOT NULL,
    `optimizedBullets` TEXT NOT NULL,
    `originalDescription` TEXT NULL,
    `optimizedDescription` TEXT NULL,
    `keywordsSuggestions` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Optimization_asin_idx`(`asin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
