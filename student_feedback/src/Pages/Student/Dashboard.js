// pages/student/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";
import SubjectTable from "../../components/student/SubjectTable";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const [selectedSem, setSelectedSem] = useState("1");
  // const semesterData = semesters[selectedSem];
  const [semesterData, setSemesterData] = useState({ theory: [], practical: [] });

  useEffect(() => {
    // Fetch data from backend whenever selectedSem changes
    fetch(`http://localhost:3001/api/student/semester/${selectedSem}`)
      .then((res) => res.json())
      .then((data) => {
        setSemesterData(data);
      })
      .catch((err) => {
        toast.error("Error fetching semester data:", err);
        setSemesterData({ theory: [], practical: [] }); // fallback
      });
  }, [selectedSem]);

  return (
    <div className="flex min-h-screen bg-blue-200">
      <Sidebar />
      <div className="flex-1">
        <Header userRole="student" />
        <div className="p-6">
          <div className="flex justify-between items-center my-4">
            <select
              className="border px-4 py-2 rounded  bg-purple-500 hover:bg-purple-600 text-white shadow"
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
            >
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
            <button className=" bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">Previous</button>
          </div>

          <div className="space-y-6">
            <SubjectTable title="Theory Subjects" subjects={semesterData.theory || []} />
            <SubjectTable title="Practical Subjects" subjects={semesterData.practical || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
