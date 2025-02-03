/*
  Warnings:

  - You are about to drop the column `genreId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `_BookToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_B_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genreId";

-- DropTable
DROP TABLE "_BookToGenre";
