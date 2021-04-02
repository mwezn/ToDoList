import {React, useState, useContext} from "react";
import { AuthContext } from '../App2'


export default function Login() {
  
  const [loginCredentials, setParams] = useState({email: "", password: "", emailExist:null, passCorrect: null});
  const  { dispatch } = useContext(AuthContext);
  



  

  async function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example',data: loginCredentials})
  };
  
  fetch('http://localhost:3001/login',requestOptions)
     .then(res => {
       if (res.status===401) {
        const newObj={passCorrect: false}
        setParams(oldObj=>{ return {...oldObj, ...newObj}})
      }
      else if(res.status===400){
        const newObj={emailExist: false}
        setParams(oldObj=>{return {...oldObj, ...newObj}})
      }
      return res.json()
    })
    //.then(res => res.json())
    .then(resJSON=>dispatch({type: "LOGIN", payload: resJSON}))
    .then(()=>console.log(localStorage.getItem('token')+"HAHA GOTIT"))
  
  }
  

  
  function enterEmail(e){
    const newObj={email:e.target.value}
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
    <form id="loginCardItems" onSubmit={(e)=>handleSubmit(e)} method="post">
        <label for="email">Email:</label><br></br>
        <input type="text" name="email" placeholder="Enter Email" onChange={(e)=>enterEmail(e)}></input><br></br>
        <label for="pass">Password:</label><br></br>
        <input type="text" name="pass" placeholder="Enter Password" onChange={(e)=>enterPassword(e)}></input><br></br>
        <button>Login</button>
    </form> 
    <div><h1>{loginCredentials.emailExist===false?<p className="emailTaken">Email doesn't exist</p>:loginCredentials.passCorrect===false?<p className="emailTaken">Wrong Password</p>:null}</h1></div>
    </div>
    </div>
    
  );
  };