-- AlterTable
ALTER TABLE "public"."Note" ADD COLUMN     "sessionId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
