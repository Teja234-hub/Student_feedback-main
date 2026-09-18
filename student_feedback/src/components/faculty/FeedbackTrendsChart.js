import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const exportToCSV = (data, filename) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((h) =>
      JSON.stringify(row[h], (_, v) => v ?? "")
    );
    csvRows.push(values.join(","));
  }

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const FeedbackTrendsChart = () => {
  const handleExport = () => {
    exportToCSV(courseData, "feedback_trends.csv");
  };

  const { user } = useContext(AuthContext);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchCoursesWithRatings = async () => {
      try {
        const theoryRes = await fetch(
          `http://localhost:3001/api/faculty/theory-courses/${user.faculty_id}`
        );
        const theoryCourses = await theoryRes.json();

        const theoryWithRatings = await Promise.all(
          theoryCourses.map(async (course) => {
            const res = await fetch(
              `http://localhost:3001/api/faculty/avg-theory-rating/${user.faculty_id}/${course.course_id}`
            );
            const ratingData = await res.json();
            return {
              ...course,
              average_rating: ratingData.average_rating,
              total_feedbacks: ratingData.total_feedbacks,
            };
          })
        );

        const practicalRes = await fetch(
          `http://localhost:3001/api/faculty/practical-courses/${user.faculty_id}`
        );
        const practicalCourses = await practicalRes.json();

        const practicalWithRatings = await Promise.all(
          practicalCourses.map(async (course) => {
            const res = await fetch(
              `http://localhost:3001/api/faculty/avg-practical-rating/${user.faculty_id}/${course.course_id}`
            );
            const ratingData = await res.json();
            return {
              ...course,
              average_rating: ratingData.average_rating,
              total_feedbacks: ratingData.total_feedbacks,
            };
          })
        );

        setCourseData([...theoryWithRatings, ...practicalWithRatings]);

      } catch (error) {
        toast.error("Error fetching dashboard data");
      }
    };

    fetchCoursesWithRatings();
  }, [user]);

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold">Trends</h3>
        <button
          className="border px-2 py-1 rounded text-sm"
          onClick={handleExport}
        >
          📥 Export
        </button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={courseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average_rating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeedbackTrendsChart;
