/*
  Warnings:

  - A unique constraint covering the columns `[welcomeScreenId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thankYouScreenId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thankYouScreenId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_userId_fkey";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "thankYouScreenId" TEXT NOT NULL,
ADD COLUMN     "welcomeScreenId" TEXT;

-- CreateTable
CREATE TABLE "welcome_screens" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "buttonText" TEXT NOT NULL DEFAULT 'Start',
    "backgroundImage" TEXT,

    CONSTRAINT "welcome_screens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thank_you_screens" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "buttonText" TEXT,
    "backgroundImage" TEXT,

    CONSTRAINT "thank_you_screens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_welcomeScreenId_key" ON "Form"("welcomeScreenId");

-- CreateIndex
CREATE UNIQUE INDEX "Form_thankYouScreenId_key" ON "Form"("thankYouScreenId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_welcomeScreenId_fkey" FOREIGN KEY ("welcomeScreenId") REFERENCES "welcome_screens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_thankYouScreenId_fkey" FOREIGN KEY ("thankYouScreenId") REFERENCES "thank_you_screens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
