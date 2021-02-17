
import React, { useState } from "react";



export default function Register() {
  
  const [loginCredentials, setParams] = useState({email: "", user: "" ,password: ""});


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
  fetch('http://localhost:3001/users', requestOptions)
      .then(res => res.text())
    
  }
  function enterEmail(e){
    const newObj={email:e.target.value}
    setParams(oldObj=>{
        return {...oldObj,...newObj}
    })
    console.log(newObj)
  }
  function enterUser(e){
    const newObj={user:e.target.value}
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
    <form id="loginCardItems" onSubmit={(e)=>handleSubmit(e)}>
        <label for="email">Email:</label><br></br>
        <input type="text" name="email" placeholder="Enter Email" onChange={(e)=>enterEmail(e)}></input><br></br>
        <label for="email">Username:</label><br></br>
        <input type="text" name="email" placeholder="Enter Username" onChange={(e)=>enterUser(e)}></input><br></br>
        <label for="pass">Password:</label><br></br>
        <input type="text" name="pass" placeholder="Enter Password" onChange={(e)=>enterPassword(e)}></input><br></br>
        <button>Register</button>
    </form> 
    </div>
    </div>
    
  );
}
