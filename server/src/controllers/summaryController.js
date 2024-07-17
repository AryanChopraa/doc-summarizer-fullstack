const prisma = require("../../prismaClient");
const multer = require('multer');
const pdf = require('pdf-parse');
const natural = require('natural');
const sentiment = require('sentiment');

const upload = multer({ storage: multer.memoryStorage() });

const processText = async (text, userId, type) => {

  const summary = text.split('.').slice(0, 3).join('.') + '.';

  

  const sentimentAnalysis = 'positive'



  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  const frequencyDist = natural.NGrams.ngrams(tokens, 1).reduce((freq, gram) => {
    const word = gram[0];
    freq[word] = (freq[word] || 0) + 1;
    return freq;
  }, {});
  const topTopics = Object.entries(frequencyDist)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(item => item[0])
    .join(', ');


  const tfidf = new natural.TfIdf();
  tfidf.addDocument(text);
  const keywords = tfidf.listTerms(0).slice(0, 10).map(item => item.term).join(', ');

  // Store in database
  response=await prisma.document.create({
    data: {
      userId,
      type,
      summary,
      sentimentAnalysis,
      topicIdentification: topTopics,
      keywordExtraction: keywords,
    },
  });

  return response;

  
};

const createSummary = [
  upload.single('document'),
  async (req, res) => {
    try {
      const userId = req.userId;
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

      response=await processText(text, userId, type);

      res.status(200).json({ message: 'Summary created successfully',
        documentId : response.id
      });
    } catch (error) {
      console.error('Error creating summary:', error);
      res.status(500).json({ error: 'An error occurred while creating the summary' });
    }
  }
];

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

module.exports = {
  createSummary,
  getSummaries,
  getSummary
};