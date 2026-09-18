
import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import logo from "../../assets/collegelogo.png";
const Header = ({ userRole }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-yellow-200 shadow">
            <div className='flex gap-4 items-center '><img src={logo} className="h-12 w-auto rounded-full"></img> <h1 className="text-2xl font-bold">Indian Institute of Engineering Science and Technology,Shibpur</h1></div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="border rounded pl-8 pr-4 py-1"
                    />
                    <FaSearch className="absolute top-2 left-2 text-gray-400" />
                </div>
                <div className="text-sm text-right">
                    <div>
                        {userRole === 'admin'
                            ? "Admin’s portal"
                            : userRole === 'faculty'
                                ? "Professor"
                                : "Student"}
                    </div>
                    <div className="font-semibold">{user?.name}</div>
                </div>
            </div>
        </div>
    );
};

export default Header;