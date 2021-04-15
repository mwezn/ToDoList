
import { AuthContext } from '../App'
import {useContext } from "react";
import './App.css'





function Navigate(props){
  const  { dispatch } = useContext(AuthContext);
  
  return props.authed?(
    <div>
      <ul className="NavBar">
        <li><a href="/" /*onClick={(e)=>e.preventDefault()}*/ >Home</a></li>
        <li><a href="/completed">Complete</a></li>
        <li><a href="/logout" onClick={()=>dispatch({type: "LOGOUT"})}>Logout</a></li>
      </ul>
    </div>):(
      <div>
      <ul className="NavBar">
        <li><a href="/">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
)
}



  export default Navigate