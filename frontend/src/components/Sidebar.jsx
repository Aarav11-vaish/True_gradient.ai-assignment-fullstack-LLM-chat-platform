import React from "react";

function Sidebar(){
return (
    <div className="w-64 h-screen bg-gray-600 text-white p-4">
        <ul>
            <li className="mb-4 hover:bg-gray-700 p-2 rounded">Home</li>
            <li className="mb-4 hover:bg-gray-700 p-2 rounded">Profile</li>
            <li className="mb-4 hover:bg-gray-700 p-2 rounded">Settings</li>
            <li className="mb-4 hover:bg-gray-700 p-2 rounded">Logout</li>
        </ul>

    </div>
)
}

export default Sidebar;