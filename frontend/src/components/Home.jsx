import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Input_button from "./Input_button";
import chatstore from "../../state_management/chatstore.js";
import userAuthstore from "../../state_management/authStore.js";

function Home() {
  const { chatlist, loader } = chatstore();
  const { isloggedin } = userAuthstore();

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {isloggedin ? (
          <>
            {/* Sidebar */}
            <div className="w-64 bg-gray-950 text-white border-r border-gray-700">
              <Sidebar />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-4 py-8">
                  
                  {chatlist.length === 0 ? (
                    <div className="flex justify-center items-center h-96">
                      <p className="text-gray-400 text-lg">
                        Start a conversation...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {chatlist.map((chat, i) => (
                        <div
                          key={i}
                          className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-2xl ${
                              chat.role === "user"
                                ? "bg-gray-100 rounded-2xl px-4 py-3"
                                : "w-full"
                            }`}
                          >
                            <div className="text-xs font-semibold text-gray-900 mb-1">
                              {chat.role === "user" ? "You" : "bot"}
                            </div>
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {chat.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {loader && (
                        <div className="flex justify-center items-center h-6">
                          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Input_button />
            </div>
          </>
        ) : (
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
