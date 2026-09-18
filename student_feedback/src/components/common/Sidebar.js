import { CiSettings } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { PiSignOutThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";


const Sidebar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleSignOut = () => {
        logout();
        toast.success("Sign Out Successful");
        navigate("/");
    };

    return (

        <div className="w-64 bg-blue-400 shadow p-4 flex flex-col justify-between">
            <div>
                <div className="text-3xl font-bold mb-6 underline underline-offset-8 decoration-yellow-500 decoration-2">🎓 Dashboard</div>
                <div className="text-sm text-gray-900 space-y-4">
                    <div className="flex gap-2 items-center text-lg font-semibold hover:cursor-pointer border-b py-2" onClick={() => navigate(`/${user.role}/dashboard`)}>
                        <MdDashboard />
                        <div>Dashboard</div>
                    </div>
                    <div className="flex gap-2 items-center text-lg font-semibold hover:cursor-pointer border-b pb-2 " onClick={() => navigate(`/${user.role}/settings`)}>
                        <CiSettings />
                        <div> Settings</div>
                    </div>
                    <div onClick={handleSignOut}
                    className="flex gap-2 items-center text-lg font-semibold hover:cursor-pointer border-b pb-2 ">
                        <PiSignOutThin />
                        <div>Sign Out</div></div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
