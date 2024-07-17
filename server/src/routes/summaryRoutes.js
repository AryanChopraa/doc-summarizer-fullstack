const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summaryController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create",authMiddleware, summaryController.createSummary);
router.get("/all", authMiddleware, summaryController.getSummaries);
router.get("/:id", authMiddleware, summaryController.getSummary);

module.exports = router;
