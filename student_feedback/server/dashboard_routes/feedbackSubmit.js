const express = require("express");
const router = express.Router();
const db = require("../db");

// Route to submit feedback
router.post("/submit-feedback", async (req, res) => {
  const {
    formType,
    student_id,
    faculty_id,
    course_id,
    semester,
    year,
    responses,
    comments,
  } = req.body;

  try {
    if (formType === "theory") {
      const result = await db.promise().query(
        `INSERT INTO feedback_theory 
        (student_id, faculty_id, course_id, semester, year,
         q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, comments) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          student_id,
          faculty_id,
          course_id,
          semester,
          year,
          responses[0],
          responses[1],
          responses[2],
          responses[3],
          responses[4],
          responses[5],
          responses[6],
          responses[7],
          responses[8],
          responses[9],
          comments,
        ]
      );
    } else if (formType === "practical") {
      const result = await db.promise().query(
        `INSERT INTO feedback_practical 
        (student_id, faculty_id, course_id, semester, year,
         q1, q2, q3, q4, q5, comments) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          student_id,
          faculty_id,
          course_id,
          semester,
          year,
          responses[0],
          responses[1],
          responses[2],
          responses[3],
          responses[4],
          comments,
        ]
      );
    } else if(formType==="course"){
      const result = await db.promise().query(
        `INSERT INTO feedback_course 
        (student_id, course_id, semester, year,
         q1, q2, q3, q4, q5, comments) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          student_id,
          course_id,
          semester,
          year,
          responses[0],
          responses[1],
          responses[2],
          responses[3],
          responses[4],
          comments,
        ]
      );
    }
    else {
      return res.status(400).json({ message: "Invalid formType" });
    }

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("Error inserting feedback:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
});

module.exports = router;
