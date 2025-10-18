import { create } from 'zustand';
import axios from 'axios';
import { axiosInstance } from '../axios.js';

export const chatstore = create((set, get) => ({
  messageinput: '',
  chatlist: [],
  setmessageinput: (input) => set({ messageinput: input }),

  // Send message to backend
  sendMessage: async () => {
    const { messageinput } = get();
    if (!messageinput.trim()) return;

    try {
      const res = await axiosInstance.post('/chat/messages', {
        message: messageinput,
      });

      const { reply } = res.data;

      set((state) => ({
        chatlist: [
          ...state.chatlist,
          { role: 'user', content: messageinput },
          { role: 'assistant', content: reply },
        ],
        messageinput: '',
      }));
    } catch (err) {
      console.error('Error sending message:', err);
    }
  },

  // Fetch stored messages
  fetchMessages: async () => {
    try {
      const res = await axiosInstance.get('/chat/messages');
      set({ chatlist: res.data });
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  },
}));
export default chatstore