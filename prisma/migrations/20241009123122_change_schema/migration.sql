/*
  Warnings:

  - You are about to drop the column `thankYouScreenId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeScreenId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThankYouScreen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WelcomeScreen` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ScreenType" AS ENUM ('welcomeScreen', 'short_text', 'long_text', 'multiple_choice', 'dropdown', 'date', 'rating', 'boolean', 'email', 'website', 'file_upload', 'number', 'opinion_scale', 'picture_choice', 'endScreen');

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_thankYouScreenId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_welcomeScreenId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_formId_fkey";

-- DropIndex
DROP INDEX "Form_thankYouScreenId_key";

-- DropIndex
DROP INDEX "Form_welcomeScreenId_key";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "thankYouScreenId",
DROP COLUMN "welcomeScreenId";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "ThankYouScreen";

-- DropTable
DROP TABLE "WelcomeScreen";

-- CreateTable
CREATE TABLE "Screen" (
    "id" TEXT NOT NULL,
    "type" "ScreenType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "buttonText" TEXT,
    "order" INTEGER NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "formId" TEXT NOT NULL,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "imageUrl" TEXT,
    "screenId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
