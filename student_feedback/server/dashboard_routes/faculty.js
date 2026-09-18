const express = require("express");
const router = express.Router();
const db = require("../db");

// --- GET THEORY COURSES ---
router.get("/theory-courses/:facultyId", (req, res) => {
  const facultyId = req.params.facultyId;

  db.query("CALL get_theory_courses_by_faculty(?)", [facultyId], (err, results) => {
    if (err) {
      console.error("Error fetching theory courses:", err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json(results[0]); // theory courses list
  });
});

// --- GET PRACTICAL COURSES ---
router.get("/practical-courses/:facultyId", (req, res) => {
  const facultyId = req.params.facultyId;

  db.query("CALL get_practical_courses_by_faculty(?)", [facultyId], (err, results) => {
    if (err) {
      console.error("Error fetching practical courses:", err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json(results[0]); // practical courses list
  });
});

// --- GET AVERAGE THEORY RATING ---
router.get("/avg-theory-rating/:facultyId/:courseId", (req, res) => {
  const { facultyId, courseId } = req.params;

  db.query("CALL get_avg_rating_theory(?, ?)", [facultyId, courseId], (err, results) => {
    if (err) {
      console.error("Error fetching avg theory rating:", err);
      return res.status(500).json({ error: "DB error" });
    }
    // console.log(results);

    const rating = results[0][0]?.avg_rating || 0;
    const totalFeedbacks = results[0][0]?.total_feedbacks || 0;
    // console.log(rating);
    res.json({ average_rating: rating, total_feedbacks: totalFeedbacks});
  });
});

// --- GET AVERAGE PRACTICAL RATING ---
router.get("/avg-practical-rating/:facultyId/:courseId", (req, res) => {
  const { facultyId, courseId } = req.params;

  db.query("CALL get_avg_rating_practical(?, ?)", [facultyId, courseId], (err, results) => {
    if (err) {
      console.error("Error fetching avg practical rating:", err);
      return res.status(500).json({ error: "DB error" });
    }

    const rating = results[0][0]?.avg_rating || 0;
    const totalFeedbacks = results[0][0]?.total_feedbacks || 0;
    res.json({ average_rating: rating, total_feedbacks: totalFeedbacks});
  });
});


module.exports = router;