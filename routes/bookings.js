const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE BOOKING
router.post("/create", (req, res) => {
  const { user_id, machine_id, hours } = req.body;

  const amount = hours * 2000;

  db.query(
    "INSERT INTO bookings (user_id, machine_id, hours, amount) VALUES (?, ?, ?, ?)",
    [user_id, machine_id, hours, amount],
    (err, data) => {
      res.json({ booking_id: data.insertId });
    }
  );
});

// GET BOOKINGS
router.get("/", (req, res) => {
  db.query("SELECT * FROM bookings", (err, data) => {
    res.json(data);
  });
});

module.exports = router;