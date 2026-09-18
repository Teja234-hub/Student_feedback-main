import Sidebar from "../../components/common/Sidebar";
 import Header from "../../components/common/Header";
import SummaryCards from '../../components/faculty/SummaryCards';
import CourseFeedbackBars from '../../components/faculty/CourseFeedbackBars';
import FeedbackTrendsChart from '../../components/faculty/FeedbackTrendsChart';

const FacultyDashboard = () => (
  <div className="flex min-h-screen bg-yellow-50">
    <Sidebar />
    <div className="flex-1">
      <Header userRole="faculty" />
    <div className="p-6 bg-yellow-50 min-h-screen"> 
    <SummaryCards />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CourseFeedbackBars />
      <FeedbackTrendsChart />
    </div>
  </div>
    </div>
  </div>
);

export default FacultyDashboard;
