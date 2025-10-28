import { create } from 'zustand';
import {axiosInstance} from '../axios.js';


const userAuthstore = create((set) => ({
    user: null,
    loading: false,
    error: null,
isloggedin : false,

    loginwithgoogle: async (userData) => {

        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.post('/google-signin', userData);
            set({ user: res.data, error: null });
            set({isloggedin:true});
        }
        catch (error) {
            console.log(error);
            set({ loading: false, error: null });
        }
    }, 
    logout: ()=>{
        set({user:null})
    },


}))


export default userAuthstore;