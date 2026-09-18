const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/semester/:semester', async (req, res) => {
  const semester = req.params.semester;

  try {
    const [rows] = await db.promise().query('CALL get_courses_by_semester(?)', [semester]);

    // Separate theory and practical courses
    const theory = [];
    const practical = [];

    rows[0].forEach(course => {
      if (course.course_type === 'theory') theory.push(course);
      else if (course.course_type === 'practical') practical.push(course);
    });

    res.json({ theory, practical });
  } catch (err) {
    console.error("Error fetching semester courses:", err);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;

// export const semesters = {
//   1: {
//     theory: [
//       { id: "M101", name: "Mathematics – I", faculty: "Dr. R. Sinha" },
//       { id: "CH101", name: "Chemistry", faculty: "Dr. A. Dey" },
//       { id: "CS1101", name: "Intro to Computing", faculty: "Dr. N. Ghosh" },
//       { id: "ME101", name: "Mechanics", faculty: "Dr. S. Gupta" },
//       { id: "EN101", name: "English & Ethics", faculty: "Dr. M. Roy" },
//     ],
//     practical: [
//       { id: "CH1171", name: "Chemistry Lab", faculty: "Dr. A. Dey" },
//       { id: "CS1171", name: "Computer Lab", faculty: "Dr. N. Ghosh" },
//       { id: "ME1171", name: "Workshop", faculty: "Mr. D. Sen" },
//     ],
//   },
//   2: {
//     theory: [
//       { id: "M102", name: "Mathematics – II", faculty: "Dr. R. Sinha" },
//       { id: "PH101", name: "Physics", faculty: "Dr. B. Pal" },
//       { id: "EE101", name: "Basic Electrical Eng.", faculty: "Dr. M. Chakraborty" },
//       { id: "EV101", name: "Environment & Ecology", faculty: "Dr. P. Das" },
//       { id: "EN102", name: "Sociology & Ethics", faculty: "Dr. M. Roy" },
//     ],
//     practical: [
//       { id: "PH1171", name: "Physics Lab", faculty: "Dr. B. Pal" },
//       { id: "EE1171", name: "Electrical Lab", faculty: "Dr. M. Chakraborty" },
//       { id: "ME1271", name: "Workshop", faculty: "Mr. D. Sen" },
//     ],
//   },
//   3: {
//     theory: [
//       { id: "MA201", name: "Mathematics – III", faculty: "Dr. K. Bera" },
//       { id: "CS2101", name: "Discrete Structures", faculty: "Dr. P. Roy" },
//       { id: "CS2102", name: "Digital Logic", faculty: "Dr. S. Banerjee" },
//       { id: "CS2103", name: "Data Structures", faculty: "Dr. N. Ghosh" },
//       { id: "CS2104", name: "Signals and Systems", faculty: "Dr. A. Mitra" },
//     ],
//     practical: [
//       { id: "CS2171", name: "Digital Logic Lab", faculty: "Dr. S. Banerjee" },
//       { id: "CS2172", name: "Data Structures Lab", faculty: "Dr. N. Ghosh" },
//       { id: "CS2173", name: "Signals Lab", faculty: "Dr. A. Mitra" },
//     ],
//   },
//   4: {
//     theory: [
//       { id: "CS2201", name: "Design & Analysis of Algorithms", faculty: "Dr. P. Roy" },
//       { id: "CS2202", name: "Computer Architecture I", faculty: "Dr. A. Mukherjee" },
//       { id: "CS2203", name: "Programming Paradigms", faculty: "Dr. T. Dutta" },
//       { id: "CS2204", name: "Theory of Computation", faculty: "Dr. K. Bera" },
//       { id: "CS2205", name: "Intro to Data Science", faculty: "Dr. A. Das" },
//     ],
//     practical: [
//       { id: "CS2271", name: "Algorithm Lab", faculty: "Dr. P. Roy" },
//       { id: "CS2272", name: "CAO Lab", faculty: "Dr. A. Mukherjee" },
//       { id: "CS2273", name: "Paradigms Lab", faculty: "Dr. T. Dutta" },
//     ],
//   },
//   5: {
//     theory: [
//       { id: "CS3101", name: "Microprocessor Systems", faculty: "Dr. D. Chatterjee" },
//       { id: "CS3102", name: "DBMS", faculty: "Dr. A. Saha" },
//       { id: "CS3103", name: "Computer Architecture II", faculty: "Dr. A. Mukherjee" },
//       { id: "CS3104", name: "Graph Algorithms", faculty: "Dr. T. Dutta" },
//       { id: "CS3121", name: "Computer Graphics", faculty: "Dr. R. Roy" }, // elective
//     ],
//     practical: [
//       { id: "CS3171", name: "Microprocessor Lab", faculty: "Dr. D. Chatterjee" },
//       { id: "CS3172", name: "DBMS Lab", faculty: "Dr. A. Saha" },
//       { id: "CS3181", name: "Graphics Lab", faculty: "Dr. R. Roy" },
//     ],
//   },
//   6: {
//     theory: [
//       { id: "CS3201", name: "Operating Systems", faculty: "Dr. T. Dutta" },
//       { id: "CS3202", name: "Data Communication & Networks", faculty: "Dr. A. Saha" },
//       { id: "CS3203", name: "Software Engineering", faculty: "Dr. M. Roy" },
//       { id: "CS3204", name: "Information Security", faculty: "Dr. D. Das" },
//       { id: "CS3221", name: "Nature Inspired Algorithms", faculty: "Dr. A. Basu" }, // elective
//     ],
//     practical: [
//       { id: "CS3271", name: "OS Lab", faculty: "Dr. T. Dutta" },
//       { id: "CS3272", name: "Networks Lab", faculty: "Dr. A. Saha" },
//       { id: "CS3273", name: "SE Lab", faculty: "Dr. M. Roy" },
//     ],
//   },
//   7: {
//     theory: [
//       { id: "CS4101", name: "Compiler Design", faculty: "Dr. P. Roy" },
//       { id: "CS4102", name: "Machine Learning", faculty: "Dr. D. Das" },
//       { id: "CS4121", name: "Embedded Systems", faculty: "Dr. A. Mitra" }, // elective
//       { id: "OE01", name: "Open Elective - HSS III", faculty: "Dr. S. Bhattacharya" },
//     ],
//     practical: [
//       { id: "CS4171", name: "Compiler Lab", faculty: "Dr. P. Roy" },
//       { id: "CS4172", name: "ML Lab", faculty: "Dr. D. Das" },
//       { id: "CS4173", name: "Project Phase 1", faculty: "Dept. Guide" },
//     ],
//   },
//   8: {
//     theory: [
//       { id: "CS4201", name: "Artificial Intelligence", faculty: "Dr. A. Das" },
//       { id: "CS4221", name: "Big Data Analytics", faculty: "Dr. A. Ghosh" }, // elective
//       { id: "OE02", name: "Open Elective II", faculty: "Dr. S. Bhattacharya" },
//     ],
//     practical: [
//       { id: "CS4271", name: "AI Lab", faculty: "Dr. A. Das" },
//       { id: "CS4272", name: "Project Phase 2", faculty: "Dept. Guide" },
//       { id: "CS4292", name: "Comprehensive Viva", faculty: "Dept. Panel" },
//     ],
//   },
// };