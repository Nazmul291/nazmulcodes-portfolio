-- CreateTable
CREATE TABLE "redirects" (
    "id" TEXT NOT NULL,
    "source_slug" TEXT NOT NULL,
    "target_url" TEXT NOT NULL,
    "status_code" INTEGER NOT NULL DEFAULT 301,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redirects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "redirects_source_slug_key" ON "redirects"("source_slug");

-- CreateIndex
CREATE INDEX "redirects_source_slug_idx" ON "redirects"("source_slug");
