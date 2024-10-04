/*
  Warnings:

  - You are about to drop the column `fontColor` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "fontColor",
DROP COLUMN "textColor",
ADD COLUMN     "fontFamilty" TEXT,
ADD COLUMN     "theme" TEXT;
