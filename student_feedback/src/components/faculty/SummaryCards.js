import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SummaryCards = () => {

  const { user } = useContext(AuthContext);
  const [averageRating, setAverageRating] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);

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

        const all = [...theoryWithRatings, ...practicalWithRatings];

        // 3. Calculate average rating
        const validRatings = all
          .map((c) => Number(c.average_rating))
          .filter((r) => !isNaN(r));

        const avg =
          validRatings.length > 0
            ? validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length
            : null;

        setAverageRating(avg ? Number(avg.toFixed(2)) : 0);

        // 4. Calculate total courses
        setTotalCourses(all.length);

        // 5. Calculate total feedback
        const totalFeedback = all.reduce((sum, c) => sum + (c.total_feedbacks || 0), 0);
        setTotalFeedbacks(totalFeedback);
      } catch (error) {
        toast.error("Error fetching dashboard data:", error);
      }
    };

    fetchCoursesWithRatings();
  }, [user]);

  return(
    <div className="flex flex-col md:flex-row gap-4 mb-4">
    <div className="bg-red-100 p-4 rounded shadow flex-1">
      <p className="text-sm">Avg. Rating</p>
      <h2 className="text-2xl font-bold">{averageRating+' ⭐'}</h2>
    </div>
    <div className="bg-yellow-100 p-4 rounded shadow flex-1">
      <p className="text-sm">Total Feedback</p>
      <h2 className="text-2xl font-bold">{totalFeedbacks}</h2>
    </div>
    <div className="bg-green-100 p-4 rounded shadow flex-1">
      <p className="text-sm">Courses Taught</p>
      <h2 className="text-2xl font-bold">{totalCourses}</h2>
    </div>
  </div>
  );
};

export default SummaryCards;
