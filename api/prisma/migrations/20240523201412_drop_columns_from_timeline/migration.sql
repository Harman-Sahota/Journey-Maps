/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `Timeline` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Timeline` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Timeline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Timeline" DROP COLUMN "coverImageUrl",
DROP COLUMN "description",
DROP COLUMN "iconUrl";
