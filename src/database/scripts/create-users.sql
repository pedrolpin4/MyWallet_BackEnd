CREATE TABLE "transactions" (
  "id" SERIAL,
  "userId" INTEGER,
  "value" NUMERIC,
  "description" TEXT NOT NULL,
  "password" TEXT NOT NULL
);