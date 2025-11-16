import { useEffect } from "react";
import { useState } from "react";
import userAuthstore from "../../state_management/authStore";
import Input_button from "./Input_button";
import Navbar from "./Navbar";
function Home_page(){
    const { isloggedin } = userAuthstore();
    return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
         <div className="flex-1 flex justify-center items-center bg-gray-100">
            <div className="text-center">
              <h2 className="text-3xl font-medium text-gray-800 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-500">Please login to continue</p>
            </div>
          </div>
        </div>
          <Input_button />
    </div>  
    )
}

export default Home_page;