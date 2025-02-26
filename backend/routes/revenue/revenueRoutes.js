const express = require("express");
const { fetchRevenue } = require("../../controllers/revenue/revenueController");

const router = express.Router();

// Sử dụng query param thay vì path param để phù hợp với frontend
router.get("/revenue", fetchRevenue);

module.exports = router;
