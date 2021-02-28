import React from "react";

export default function Logout(){
    
    function handleLogout(){
        localStorage.removeItem('token');

    }
    return(
        <form id="loginCardItems" onSubmit={(e)=>handleLogout(e)} method="get">
        <button>LogOut</button>
    </form> 
    )
}