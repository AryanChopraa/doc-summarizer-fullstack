const prisma = require("../../prismaClient");
const multer = require('multer');
const pdf = require('pdf-parse');
const {analyzeDoc} = require('../utils/googleSummarize');

const upload = multer({ storage: multer.memoryStorage() });

const createSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const summaryLength = req.body.summaryLength;
    let text, type;

    if (req.file) {
      const { buffer, mimetype } = req.file;
      type = mimetype;

      if (mimetype === 'application/pdf') {
        const pdfData = await pdf(buffer);
        text = pdfData.text;
      } else if (mimetype === 'text/plain' || mimetype === 'text/html') {
        text = buffer.toString('utf-8');
      } else {
        return res.status(400).json({ message: 'Unsupported file type' });
      }
    } else if (req.body.text) {
      text = req.body.text;
      type = 'text/plain';
    } else {
      return res.status(400).json({ message: 'No file uploaded or text provided' });
    }
    console.log(summaryLength);

    const response = await analyzeDoc(text, summaryLength);
    console.log(typeof response);

    // Insert data into the database
    const document = await prisma.document.create({
      data: {
        userId: userId,
        keyInsights: response.key_insights,
        keywords: response.keywords,
        mainTopic: response.main_topic,
        sentiment: response.sentiment,
        subtopics: response.subtopics,
        summary: response.summary
      }
    });

    res.status(200).json({
      message: 'Summary created successfully',
      documentId: document.id
    });
  } catch (error) {
    console.error('Error creating summary:', error);
    res.status(500).json({ error: 'An error occurred while creating the summary' });
  } finally {
    await prisma.$disconnect();
  }
};




const getSummaries = async (req, res) => {
  try {
    const summaries = await prisma.document.findMany({
      where: { userId: req.userId }
    });
    res.status(200).json(summaries);
  } catch (error) {
    console.error('Error fetching summaries:', error);
    res.status(500).json({ error: 'An error occurred while fetching summaries' });
  }
};

const getSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const summary = await prisma.document.findUnique({
      where: { id: id, userId: req.userId }
    });
    if (!summary) {
      return res.status(404).json({ error: 'Summary not found' });
    }
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'An error occurred while fetching the summary' });
  }
};

const deleteSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const summary = await prisma.document.delete({
      where: { id: id, userId: req.userId }
    });
    if (!summary) {
      return res.status(404).json({ error: 'Summary not found' });
    }
    res.status(200).json({ message: 'Summary deleted successfully' });
  } catch (error) {
    console.error('Error deleting summary:', error);
    res.status(500).json({ error: 'An error occurred while deleting the summary' });
  }
};

module.exports = {
  createSummary,
  getSummaries,
  getSummary,
  deleteSummary
};