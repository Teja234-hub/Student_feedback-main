import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const getColor = (rating) => {
  if (rating >= 90) return 'bg-orange-400';
  if (rating >= 75) return 'bg-purple-400';
  if (rating >= 50) return 'bg-green-400';
  return 'bg-blue-400';
};

const CourseFeedbackBars = () => {
  const { user } = useContext(AuthContext);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchCoursesWithRatings = async () => {
      try {
        // 1. Fetch theory courses and attach ratings
        const theoryRes = await fetch(`http://localhost:3001/api/faculty/theory-courses/${user.faculty_id}`);
        const theoryCourses = await theoryRes.json();

        const theoryWithRatings = await Promise.all(
          theoryCourses.map(async (course) => {
            const res = await fetch(`http://localhost:3001/api/faculty/avg-theory-rating/${user.faculty_id}/${course.course_id}`);
            const ratingData = await res.json();
            return { ...course, average_rating: ratingData.average_rating , total_feedbacks: ratingData.total_feedbacks };
          })
        );

        // 2. Fetch practical courses and attach ratings
        const practicalRes = await fetch(`http://localhost:3001/api/faculty/practical-courses/${user.faculty_id}`);
        const practicalCourses = await practicalRes.json();

        const practicalWithRatings = await Promise.all(
          practicalCourses.map(async (course) => {
            const res = await fetch(`http://localhost:3001/api/faculty/avg-practical-rating/${user.faculty_id}/${course.course_id}`);
            const ratingData = await res.json();
            return { ...course, average_rating: ratingData.average_rating , total_feedbacks: ratingData.total_feedbacks };
          })
        );

        setCourseData([...theoryWithRatings, ...practicalWithRatings]);

      } catch (error) {
        toast.error("Error fetching dashboard data:", error);
      }
    };

    fetchCoursesWithRatings();
  }, [user]);

  return(
    <div className="bg-white p-4 rounded shadow w-full">
      <h3 className="font-semibold mb-2">Courses feedback</h3>
      {courseData.map((course) => (
        <div key={course.id} className="mb-3">
          <div className="flex justify-between text-sm">
            <span>{course.course_id} {course.course_name}</span>
            <span>{course.average_rating != null  ? Math.round((course.average_rating / 5) * 100)  : 0}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className={`${getColor(course.average_rating != null  ?  Math.round((course.average_rating / 5) * 100) : 0)} h-2 rounded`} style={{ width: `${course.average_rating != null  ?  Math.round((course.average_rating / 5) * 100) : 0}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseFeedbackBars;
