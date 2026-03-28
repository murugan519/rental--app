const express = require("express");
const router = express.Router();
const db = require("../db");

// PARTNER LOGIN
router.post("/login", (req, res) => {
  const { phone } = req.body;

  db.query("SELECT * FROM partners WHERE phone=?", [phone], (err, result) => {
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      db.query(
        "INSERT INTO partners (phone) VALUES (?)",
        [phone],
        (err, data) => {
          res.json({ id: data.insertId, phone });
        }
      );
    }
  });
});

module.exports = router;