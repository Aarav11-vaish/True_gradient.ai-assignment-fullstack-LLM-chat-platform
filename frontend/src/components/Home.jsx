import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Input_button from "./Input_button";
import chatstore from "../../state_management/chatstore.js";

function Home() {
  const { chatlist, fetchMessages, loader , isloggedin} = chatstore();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        {isloggedin ? (
<div>

 <div className="w-1/6 bg-gray-900 text-white">
          <Sidebar />
        </div>
        {/* Chat content */}
        <div className="flex-1 bg-gray-100 p-4 space-y-3 overflow-y-auto">
          {loader ? (
            // ✅ Loader UI
            <div className="flex justify-center items-center h-full">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            // ✅ Chat messages
            chatlist.map((chat, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  chat.role === "user"
                    ? "bg-blue-500 self-end text-right text-white"
                    : "bg-gray-900 text-left text-white"
                }`}
              >
                <p>{chat.content}</p>
              </div>
            ))
          )}
        </div>
        </div>
        ):(
          <div className="flex-1 flex justify-center items-center">
            <h2 className="text-2xl font-semibold">Please login to continue</h2>
          </div>

          
        )}
        {/* Sidebar */}
       
      </div>
    </div>
  );
}

export default Home;
