-- CreateEnum
CREATE TYPE "public"."NoteType" AS ENUM ('PLANNING', 'LORE', 'NPC');

-- AlterTable
ALTER TABLE "public"."Note" ADD COLUMN     "characterId" TEXT,
ADD COLUMN     "type" "public"."NoteType" NOT NULL DEFAULT 'PLANNING';

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
