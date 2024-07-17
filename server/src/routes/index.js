const express = require("express");
const authRouter = require("./authRoutes");
const profileRouter = require("./profileRoute");
const summaryRouter = require("./summaryRoutes");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/summary", summaryRouter);

module.exports = router;