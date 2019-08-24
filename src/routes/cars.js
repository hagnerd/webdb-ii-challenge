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

function validateInput(req, res, next) {
  const { vin, make, model, mileage } = req.body;

  if (!vin || !make || !model || !mileage) {
    res.status(400).json({
      message: "Please provide a vin, make, model and mileage"
    });
    return;
  }

  next();
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

router.get("/:id", validateId, (req, res) => {
  const { car } = req;

  res.json({
    car
  });
});

router.post("/", validateInput, async (req, res) => {
  try {
    const [id] = await db.from("cars").insert(req.body);

    res.status(201).json({
      id
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
      message: error.message
    });
  }
});

module.exports = router;
