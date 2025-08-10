/*
  Warnings:

  - The primary key for the `Banner` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Banner" DROP CONSTRAINT "Banner_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Banner_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Banner_id_seq";
