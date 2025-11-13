import { create } from 'zustand';
import axios from 'axios';
import { axiosInstance } from '../axios.js';

export const chatstore = create((set, get) => ({
  messageinput: '',
  chatlist: [],
  loader: false,
  setmessageinput: (input) => set({ messageinput: input }),

  // Send message to backend
  sendMessage: async () => {
    const { messageinput } = get();
    if (!messageinput.trim()) return;
    set({ loader: true });
    try {
      const res = await axiosInstance.post('/chat/messages', {
        message: messageinput,

      });
console.log(res.data);

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
    finally {
      set({ loader: false });
      // loader: false;
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