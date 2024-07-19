const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summaryController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });


router.post("/create", authMiddleware, upload.single('file'), summaryController.createSummary);
router.get("/all", authMiddleware, summaryController.getSummaries);
router.get("/:id", authMiddleware, summaryController.getSummary);
router.delete("/:id", authMiddleware, summaryController.deleteSummary);

module.exports = router;
