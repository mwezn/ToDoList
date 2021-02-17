import './Login.css';
import React, { useState } from "react";



export default function Login() {
  
  const [loginCredentials, setParams] = useState({email: "", password: ""});


  function validateForm() {
    return loginCredentials.email.length > 0 && loginCredentials.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(loginCredentials)
    const requestOptions = {
      method: 'POST',
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example',data: loginCredentials})
  };
  fetch('http://localhost:3001/login', requestOptions)
      .then(res => res.text())
    
  }
  function enterEmail(e){
    const newObj={email:e.target.value}
    setParams(oldObj=>{
        return {...oldObj,...newObj}
    })
    console.log(newObj)
  }
  function enterPassword(e){
    const newObj={password:e.target.value}
    setParams(oldObj=>{
        return {...oldObj,...newObj}
    })
    console.log(newObj)
  }

 

  return (
    <div>
    <div id="loginCard">
    <form id="loginCardItems" onSubmit={(e)=>handleSubmit(e)} method="get">
        <label for="email">Email:</label><br></br>
        <input type="text" name="email" placeholder="Enter Email" onChange={(e)=>enterEmail(e)}></input><br></br>
        <label for="pass">Password:</label><br></br>
        <input type="text" name="pass" placeholder="Enter Password" onChange={(e)=>enterPassword(e)}></input><br></br>
        <button>Login</button>
    </form> 
    </div>
    </div>
    
  );
}
