/*
  Warnings:

  - Made the column `startTime` on table `Shift` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `Shift` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Shift` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shift" ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET NOT NULL,
ALTER COLUMN "endTime" SET DATA TYPE TEXT,
ALTER COLUMN "location" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
