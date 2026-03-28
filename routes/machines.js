const express = require("express");
const router = express.Router();
const db = require("../db");

// GET MACHINES
router.get("/", (req, res) => {
  db.query("SELECT * FROM machines", (err, data) => {
    res.json(data);
  });
});

// ADD MACHINE (Partner)
router.post("/add", (req, res) => {
  const { name, price, image, partner_id } = req.body;

  db.query(
    "INSERT INTO machines (name, price, image, partner_id) VALUES (?, ?, ?, ?)",
    [name, price, image, partner_id],
    (err, data) => {
      res.json({ message: "Machine Added" });
    }
  );
});

module.exports = router;