/*
  Warnings:

  - You are about to drop the column `charisma` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `constitution` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `dexterity` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `intelligence` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `wisdom` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Character" DROP COLUMN "charisma",
DROP COLUMN "constitution",
DROP COLUMN "dexterity",
DROP COLUMN "intelligence",
DROP COLUMN "strength",
DROP COLUMN "wisdom";
