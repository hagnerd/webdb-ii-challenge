const express = require("express");
const db = require("../../db");

const router = express.Router();

async function validateId(req, res, next) {
  const { id } = req.params;

  try {
    const [car] = await db
      .select("*")
      .from("cars")
      .where({ id });

    if (car === undefined) {
      res.status(404).json({
        message: "invalid car id"
      });
      return;
    }

    req.car = car;
    next();
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
      message: error.message
    });
  }
}

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
