/*
  Warnings:

  - You are about to drop the column `currency` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "currency";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "cart" JSONB;
