import React from "react";
import chatstore from "../../state_management/chatstore.js";
import userAuthstore from "../../state_management/authStore.js";
import { useNavigate } from "react-router-dom";
function Navbar(){
const {isloggedin, user, loginwithgoogle, logout} = userAuthstore();
const navigate = useNavigate();
return(


<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">ChatBot</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      
      <li>
        <details>
          <summary>dropdown</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            {!isloggedin?(
              <button onClick={()=>{navigate('/login')}}>
                <li><a>Login</a></li>
              </button>
            ):
            (
            <li><a>Logout</a></li>
            )}
            
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
)
}
export default Navbar;