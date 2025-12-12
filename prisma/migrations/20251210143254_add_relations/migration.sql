/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `favorites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favorites" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_key" ON "favorites"("userId");

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
