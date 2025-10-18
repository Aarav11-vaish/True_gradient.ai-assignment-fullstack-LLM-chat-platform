import React from "react";

function Navbar(){
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
            <li><a>Login</a></li>
            <li><a>Logout</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
)
}
export default Navbar;