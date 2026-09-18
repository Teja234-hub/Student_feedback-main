// routes/faculty.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/faculty/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM faculty WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Email not found" });
    }

    const faculty = results[0];

    if (faculty.password_hash === password) {
      const { password_hash, ...facultyWithoutPassword } = faculty;
      return res.status(200).json({ 
        message: "Login successful", 
        faculty: {
            ...facultyWithoutPassword ,
            role: "faculty"
        }
    });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  });
});

module.exports = router;
