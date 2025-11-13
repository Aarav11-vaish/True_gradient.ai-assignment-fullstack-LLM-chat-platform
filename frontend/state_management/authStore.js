import { create } from 'zustand';
import { axiosInstance } from '../axios.js';


const userAuthstore = create((set) => ({
    user: null,
    loading: false,
    loader: false,
    error: null,
    isloggedin: false,

    loginwithgoogle: async (userData) => {


        set({ loading: true, error: null });

        try {
            const res = await axiosInstance.post('/google-signin', userData);
            set({
                user: res.data,
                loading: false,
                isloggedin: true,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            set({ loading: false, error: null });
        }
    },
    checkAuth : async ()=>{
     try{
const res = await axiosInstance.get('/checkAuth');
 set({
      user: res.data.user,
      isloggedin: true,
      loading: false,
    });
     }
     catch(err){
            console.log(err);
set({user :NULL , isloggedin : false});
     }
    },
    logout: () => {
        set({ user: null })
    },


}))


export default userAuthstore;