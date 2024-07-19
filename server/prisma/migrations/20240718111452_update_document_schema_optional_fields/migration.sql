/*
  Warnings:

  - You are about to drop the column `keywordExtraction` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `sentimentAnalysis` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `topicIdentification` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "keywordExtraction",
DROP COLUMN "sentimentAnalysis",
DROP COLUMN "topicIdentification",
DROP COLUMN "type",
ADD COLUMN     "keyInsights" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "mainTopic" TEXT,
ADD COLUMN     "sentiment" TEXT,
ADD COLUMN     "subtopics" TEXT[] DEFAULT ARRAY[]::TEXT[];
