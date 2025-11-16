import React, { useEffect } from "react";
import chatstore from "../../state_management/chatstore.js";

function Sidebar() {
  const { fetchChatHistory, historyChatList, activeChatId, createnewChat, fetchMessages } = chatstore();

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const handleClick = async () => {
    const id = await createnewChat();
    if (id) {
      fetchMessages(id);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-600 text-white p-4">
      <button
        className="rounded-md hover:bg-gray-700 p-2 mb-4 w-full"
        onClick={handleClick}
      >
        New Chat
      </button>

      <ul>
        {historyChatList.map((chat) => (
          <li
            key={chat._id}
            className={`mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer 
              ${activeChatId === chat._id ? "bg-gray-800" : ""}`}
            onClick={() => fetchMessages(chat._id)}
          >
            {chat.title || "Untitled Chat"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
