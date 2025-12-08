/*
  Warnings:

  - You are about to drop the `favorite_albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorite_artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorite_tracks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "album" DROP CONSTRAINT "album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_albums" DROP CONSTRAINT "favorite_albums_albumId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_albums" DROP CONSTRAINT "favorite_albums_userId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_artists" DROP CONSTRAINT "favorite_artists_artistId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_artists" DROP CONSTRAINT "favorite_artists_userId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_tracks" DROP CONSTRAINT "favorite_tracks_trackId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_tracks" DROP CONSTRAINT "favorite_tracks_userId_fkey";

-- DropForeignKey
ALTER TABLE "track" DROP CONSTRAINT "track_albumId_fkey";

-- DropForeignKey
ALTER TABLE "track" DROP CONSTRAINT "track_artistId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "version" SET DEFAULT 1,
ALTER COLUMN "createdAt" SET DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
ALTER COLUMN "createdAt" SET DATA TYPE BIGINT,
ALTER COLUMN "updatedAt" SET DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
ALTER COLUMN "updatedAt" SET DATA TYPE BIGINT;

-- DropTable
DROP TABLE "favorite_albums";

-- DropTable
DROP TABLE "favorite_artists";

-- DropTable
DROP TABLE "favorite_tracks";

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[],

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);
