import react from "react";
import { useState } from "react";
import userAuthstore from "./state_management/authStore";
import { auth, provider, signInWithPopup } from './src/configfirebase.js'
function Login() {


    const { user, loading, error, loginwithgoogle } = userAuthstore();

    const handlesubmit = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseuser = result.user;
            console.log(result);
            console.log(firebaseuser);

            await loginwithgoogle({ username: firebaseuser.displayName, email: firebaseuser.email, googleId: firebaseuser.uid });
        }
        catch (err) {

        }
    }

    return (
        <div>
            <button onClick={handlesubmit}>sign in with google</button>
        </div>
    )
}


export default Login;