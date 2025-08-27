/*
  Warnings:

  - A unique constraint covering the columns `[playerId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Campaign" DROP CONSTRAINT "Campaign_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Character" DROP CONSTRAINT "Character_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Player" DROP CONSTRAINT "Player_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_campaignId_fkey";

-- AlterTable
ALTER TABLE "public"."Campaign" ADD COLUMN     "system" TEXT NOT NULL DEFAULT 'D&D 5e';

-- AlterTable
ALTER TABLE "public"."Player" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Character_playerId_key" ON "public"."Character"("playerId");

-- AddForeignKey
ALTER TABLE "public"."Campaign" ADD CONSTRAINT "Campaign_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Character" ADD CONSTRAINT "Character_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
