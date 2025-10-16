-- AlterTable
ALTER TABLE `optimization` MODIFY `originalDescription` TEXT NULL,
    MODIFY `optimizedDescription` TEXT NULL,
    MODIFY `keywordsSuggestions` TEXT NOT NULL;
