/*
  Warnings:

  - You are about to drop the column `userId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the `_AlbumFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TrackFavorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AlbumFavorites" DROP CONSTRAINT "_AlbumFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumFavorites" DROP CONSTRAINT "_AlbumFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistFavorites" DROP CONSTRAINT "_ArtistFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistFavorites" DROP CONSTRAINT "_ArtistFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_TrackFavorites" DROP CONSTRAINT "_TrackFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrackFavorites" DROP CONSTRAINT "_TrackFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "album" DROP CONSTRAINT "album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "track" DROP CONSTRAINT "track_albumId_fkey";

-- DropForeignKey
ALTER TABLE "track" DROP CONSTRAINT "track_artistId_fkey";

-- DropIndex
DROP INDEX "favorites_userId_key";

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "userId",
ADD COLUMN     "albums" TEXT[],
ADD COLUMN     "artists" TEXT[],
ADD COLUMN     "tracks" TEXT[];

-- DropTable
DROP TABLE "_AlbumFavorites";

-- DropTable
DROP TABLE "_ArtistFavorites";

-- DropTable
DROP TABLE "_TrackFavorites";
