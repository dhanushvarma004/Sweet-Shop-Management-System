/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Sweet` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Sweet` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Sweet` table. All the data in the column will be lost.
  - Added the required column `category` to the `Sweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Sweet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL
);
INSERT INTO "new_Sweet" ("id", "name", "price") SELECT "id", "name", "price" FROM "Sweet";
DROP TABLE "Sweet";
ALTER TABLE "new_Sweet" RENAME TO "Sweet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
