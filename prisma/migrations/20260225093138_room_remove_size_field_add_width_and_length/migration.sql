/*
  Warnings:

  - You are about to drop the column `size` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "size",
ADD COLUMN     "Length" DECIMAL(10,2),
ADD COLUMN     "width" DECIMAL(10,2);
