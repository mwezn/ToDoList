import {React, useState} from "react";
import {Redirect } from 'react-router-dom';



export default function Login() {
  
  const [loginCredentials, setParams] = useState({email: "", password: ""});
  
  

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(loginCredentials)
    const requestOptions = {
      method: 'POST',
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example',data: loginCredentials})
  };
  
  fetch('http://localhost:3001/login',requestOptions)
      .then(res => res.json())
      /*.then(resJSON=>dispatch({type: "LOGIN",
    payload: resJSON}))*/
      .then(d=>{
        console.log(d.token);
        localStorage.setItem('token',d.token)
      })
      .then(()=>console.log(localStorage.getItem('token')+"HAHA GOTIT"))
      

   
  

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
    <form id="loginCardItems" onSubmit={(e)=>handleSubmit(e)} method="post">
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