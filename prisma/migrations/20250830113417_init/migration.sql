-- CreateTable
CREATE TABLE "public"."Command" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Execution" (
    "id" SERIAL NOT NULL,
    "commandId" INTEGER NOT NULL,
    "username" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "output" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Execution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Command_title_key" ON "public"."Command"("title");

-- AddForeignKey
ALTER TABLE "public"."Execution" ADD CONSTRAINT "Execution_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "public"."Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;
