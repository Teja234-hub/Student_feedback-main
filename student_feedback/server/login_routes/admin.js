// routes/student.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM admins WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Email not found" });
    }

    const admin = results[0];

    if (admin.password_hash === password) {
      const { password_hash, ...adminWithoutPassword } = admin;
      return res.status(200).json({ 
        message: "Login successful", 
        admin: {
            ...adminWithoutPassword ,
            role: "admin"
        }
    });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  });
});

module.exports = router;