const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ ADD THIS (NEW)
router.get("/test", (req, res) => {
  res.send("Auth API Working ✅");
});

// EXISTING LOGIN (DON’T DELETE)
router.post("/login", (req, res) => {
  const { phone } = req.body;

  db.query("SELECT * FROM users WHERE phone=?", [phone], (err, result) => {
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      db.query(
        "INSERT INTO users (phone) VALUES (?)",
        [phone],
        (err, data) => {
          res.json({ id: data.insertId, phone });
        }
      );
    }
  });
});

module.exports = router;
