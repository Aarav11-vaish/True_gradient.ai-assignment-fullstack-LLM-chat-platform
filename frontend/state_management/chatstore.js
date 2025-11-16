import { create } from 'zustand';
import axios from 'axios';
import { axiosInstance } from '../axios.js';
import { act } from 'react';

export const chatstore = create((set, get) => ({
  messageinput: '',
  chatlist: [],
  historyChatList :[],
  loader: false,
  activeChatId: null,  
  setmessageinput: (input) => set({ messageinput: input }),

createnewChat : async () => {
  try {
      const res = await axiosInstance.post('/new-chat');
     const { chatId } = res.data;

      // Set active chat instantly
      set({ activeChatId: chatId, chatlist: [] });

      return chatId;
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  },

  // Send message to backend
  sendMessage: async () => {
    const { messageinput , activeChatId} = get();
    if (!messageinput.trim()) return;
    set({ loader: true });
    try {
      const res = await axiosInstance.post(`/chat/${activeChatId}/messages`, {
        message: messageinput,

      });
console.log(res.data);

      const { reply , messages} = res.data;

      set({
        chatlist: messages,
        messageinput: '',
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
    finally {
      set({ loader: false });
      // loader: false;
    }
  },

  fetchChatHistory: async () => {
    try{
    const res = await axiosInstance.get('/all-chats');
    set({ historyChatList: res.data });

    }
catch(e){
  console.error('Error fetching message:', e);

}  },


  // Fetch stored messages
  fetchMessages: async (chatId) => {
    try {
      const res = await axiosInstance.get(`/chat/${chatId}`);
      set({ 
        activeChatId: chatId,
        chatlist: res.data.messages

       });
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  },
}));
export default chatstore