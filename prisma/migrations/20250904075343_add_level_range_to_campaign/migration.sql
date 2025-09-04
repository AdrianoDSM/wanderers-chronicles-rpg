-- AlterTable
ALTER TABLE "public"."Campaign" ADD COLUMN     "endLevel" INTEGER,
ADD COLUMN     "startLevel" INTEGER NOT NULL DEFAULT 1;
