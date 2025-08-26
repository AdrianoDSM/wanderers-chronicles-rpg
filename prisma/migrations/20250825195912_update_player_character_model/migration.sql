/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Note` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_sessionId_fkey";

-- DropIndex
DROP INDEX "public"."Note_sessionId_key";

-- AlterTable
ALTER TABLE "public"."Character" ADD COLUMN     "playerId" TEXT;

-- AlterTable
ALTER TABLE "public"."Note" DROP COLUMN "sessionId";

-- AlterTable
ALTER TABLE "public"."Session" ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Character" ADD CONSTRAINT "Character_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
