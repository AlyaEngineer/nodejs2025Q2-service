/*
  Warnings:

  - You are about to drop the column `userId` on the `favorites` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropIndex
DROP INDEX "favorites_userId_key";

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "userId";
