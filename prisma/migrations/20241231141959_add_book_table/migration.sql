-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONGOING', 'COMPLETE', 'INCOMPLETE');

-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "book_cover" TEXT,
    "book_profile" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ONGOING',
    "is_hot" BOOLEAN NOT NULL DEFAULT false,
    "is_new" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
