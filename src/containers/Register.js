import React, { useState } from "react";



export default function Register() {
  
  const [RegCredentials, setParams] = useState({email: "", user: "" ,password: "", emailAuth: null, serverResponse: null});


  /*function validateForm() {
    return RegCredentials.email.length > 0 && RegCredentials.password.length > 0;
  }*/

  async function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example',data: RegCredentials})
  };
  fetch('http://localhost:3001/register', requestOptions)
      .then(res => {
        if (res.status===400) {
          const newObj={emailAuth: false, serverResponse: res.text()}
          setParams(oldObj=>{ return {...oldObj, ...newObj}})
        }
        else if(res.status===200){
          const newObj={emailAuth: true, serverResponse: res.text()}
          setParams(oldObj=>{return {...oldObj, ...newObj}})
        }
        

      })
    
  }
  function enterEmail(e){
    const newObj={email:e.target.value}
    setParams(oldObj=>{
        return {...oldObj,...newObj}
    })
    
  }
  function enterUser(e){
    const newObj={user:e.target.value}
    setParams(oldObj=>{
        return {...oldObj,...newObj}
    })
    
  }
  function enterPassword(e){
    const newObj={password:e.target.value}
    setParams(oldObj=>{
        return {...oldObj,...newObj}
    })
   
  }

 

  return (
    <div>
    <div id="loginCard">
    <form id="loginCardItems" onSubmit={(e)=>handleSubmit(e)}>
        <label for="email">Email:</label><br></br>
        <input type="email" name="email" placeholder="Enter Email" onChange={(e)=>enterEmail(e)} required></input><br></br>
        <label for="email">First Name:</label><br></br>
        <input type="text" name="email" placeholder="Enter your name" onChange={(e)=>enterUser(e)} required></input><br></br>
        <label for="pass">Password:</label><br></br>
        <input type="text" name="pass" placeholder="Enter Password" onChange={(e)=>enterPassword(e)} required></input><br></br>
        <button className="regBtn">Register</button>
    </form> 
  <div><h1>{RegCredentials.emailAuth===false?<p className="emailTaken">Email already taken</p>:RegCredentials.emailAuth===true?<p className="emailRegistered">Succesfully registered. Check
    your email!</p>:null}</h1></div>
    </div>
    </div>
    
  );
}
