const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./login_routes/student");
const facultyRoutes = require("./login_routes/faculty");
const adminRoutes = require("./login_routes/admin");
const dashboardRoutes = require("./dashboard_routes/faculty");
const subjectRoutes =require("./dashboard_routes/subjects");
const studentFeedbackRoutes=require("./dashboard_routes/feedbackSubmit");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", dashboardRoutes);
app.use("/api/student", subjectRoutes);
app.use("/api/student",studentFeedbackRoutes);


app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
