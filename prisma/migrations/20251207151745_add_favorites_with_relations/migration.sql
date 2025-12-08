/*
  Warnings:

  - You are about to drop the column `albums` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `favorites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "albums",
DROP COLUMN "artists",
DROP COLUMN "tracks",
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "_ArtistFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtistFavorites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AlbumFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AlbumFavorites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TrackFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TrackFavorites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArtistFavorites_B_index" ON "_ArtistFavorites"("B");

-- CreateIndex
CREATE INDEX "_AlbumFavorites_B_index" ON "_AlbumFavorites"("B");

-- CreateIndex
CREATE INDEX "_TrackFavorites_B_index" ON "_TrackFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_key" ON "favorites"("userId");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistFavorites" ADD CONSTRAINT "_ArtistFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistFavorites" ADD CONSTRAINT "_ArtistFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumFavorites" ADD CONSTRAINT "_AlbumFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumFavorites" ADD CONSTRAINT "_AlbumFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrackFavorites" ADD CONSTRAINT "_TrackFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrackFavorites" ADD CONSTRAINT "_TrackFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
