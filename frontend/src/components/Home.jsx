import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Input_button from "./Input_button";
import chatstore from "../../state_management/chatstore.js";
import userAuthstore from "../../state_management/authStore.js";
function Home() {
  const { chatlist, fetchMessages, loader } = chatstore();
  const { isloggedin } = userAuthstore();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {isloggedin ? (
          <>
            {/* Sidebar - narrower and darker */}
            <div className="w-64 bg-gray-950 text-white border-r border-gray-700">
              <Sidebar />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Chat Messages Container - centered with max width like Claude */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-4 py-8">
                  {loader ? (
                    // Loader - centered in viewport
                    <div className="flex justify-center items-center h-96">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    </div>
                  ) : chatlist.length === 0 ? (
                    // Empty state - when no messages
                    <div className="flex justify-center items-center h-96">
                      <p className="text-gray-400 text-lg">Start a conversation...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {chatlist.map((chat, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            chat.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-2xl ${
                              chat.role === "user"
                                ? "bg-gray-100 rounded-2xl px-4 py-3"
                                : "w-full"
                            }`}
                          >
                            {/* Role label (optional - remove if you don't want it) */}
                            <div className="text-xs font-semibold text-gray-900 mb-1">
                              {chat.role === "user" ? "You" : "bot"}
                            </div>
                            
                            {/* Message content */}
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {chat.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
<Input_button/>
            </div>
          </>
        ) : (
          // Login prompt - cleaner styling
          <div className="flex-1 flex justify-center items-center bg-gray-100">
            <div className="text-center">
              <h2 className="text-3xl font-medium text-gray-800 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-500">Please login to continue</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;