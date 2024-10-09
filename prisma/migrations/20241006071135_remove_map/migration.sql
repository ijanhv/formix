/*
  Warnings:

  - You are about to drop the `thank_you_screens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `welcome_screens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_thankYouScreenId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_welcomeScreenId_fkey";

-- DropTable
DROP TABLE "thank_you_screens";

-- DropTable
DROP TABLE "welcome_screens";

-- CreateTable
CREATE TABLE "WelcomeScreen" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "buttonText" TEXT NOT NULL DEFAULT 'Start',
    "backgroundImage" TEXT,

    CONSTRAINT "WelcomeScreen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThankYouScreen" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "buttonText" TEXT,
    "backgroundImage" TEXT,

    CONSTRAINT "ThankYouScreen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_welcomeScreenId_fkey" FOREIGN KEY ("welcomeScreenId") REFERENCES "WelcomeScreen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_thankYouScreenId_fkey" FOREIGN KEY ("thankYouScreenId") REFERENCES "ThankYouScreen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
