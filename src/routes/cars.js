const express = require("express");
const db = require("../../db");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const accounts = await db.select("*").from("cars");

    res.json({
      accounts
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
      message: error.message
    });
  }
});

module.exports = router;
