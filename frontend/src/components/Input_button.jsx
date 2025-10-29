import React, { useRef, useEffect } from "react";
import chatstore from "../../state_management/chatstore.js";

function Input_button() {
  const { messageinput, setmessageinput, sendMessage } = chatstore();
  const textareaRef = useRef(null);

  const handlesubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [messageinput]);

  // Handle Enter key (send) and Shift+Enter (new line)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlesubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Centered container matching chat width */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <form onSubmit={handlesubmit}>
          <div className="relative flex items-end gap-2">
            {/* Textarea Input - expands with content */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={messageinput}
                onChange={(e) => setmessageinput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="1"
                className="w-full px-4 py-3 pr-12 text-base text-gray-900 bg-white 
                           border border-gray-300 rounded-2xl resize-none
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           placeholder:text-gray-400 max-h-40 overflow-y-auto"
                placeholder="Type your message..."
                required
              />
            </div>

            {/* Send Button - circular with icon */}
            <button
              type="submit"
              disabled={!messageinput.trim()}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center
                         bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 
                         disabled:cursor-not-allowed rounded-full transition-colors
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Send message"
            >
              {/* Send Icon (arrow up) */}
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>

          {/* Helper text */}
          <p className="text-xs text-gray-500 mt-2 px-1">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}

export default Input_button;