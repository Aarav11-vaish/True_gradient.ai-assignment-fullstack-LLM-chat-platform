import Login from "../login";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Input from "./Input_button";
import Input_button from "./Input_button";
import chatstore from "../../state_management/chatstore.js";
function Home(){
    const {chatlist, fetchMessages} = chatstore();
    useEffect(()=>{
        fetchMessages();
    }, []);
return(
    <div>
        <Navbar/>
<div className="flex h-screen">
  {/* Sidebar */}
  <div className="w-1/5 bg-gray-800 text-white">
    <Sidebar />
  </div>

  {/* Chat content */}
  <div className="flex-1 bg-gray-100 p-4 space-y-3 overflow-y-auto">
    {chatlist.map((chat, i) => (
      <div
        key={i}
        className={`p-2 rounded-lg ${
          chat.role === 'user'
            ? 'bg-blue-500 self-end text-right'
            : 'bg-gray-900 text-left text-white'
        }`}
      >
        <p>{chat.content}</p>
      </div>
    ))}
  </div>
</div>


    </div>
)
}
export default Home;