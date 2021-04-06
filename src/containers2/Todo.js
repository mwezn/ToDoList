//This is the functional component attempting to use
//React.useContext!
import './App2.css';
import React from'react';

import { AuthContext } from '../App2'




const initialState={userInput:"",toDoList:[],vis:[],
      greentick: []}

function inputValidator(arr){
  var Regex=/^[a-zA-Z0-9_]+$/g
  var result=arr.some(e=> Regex.test(e));
  return result
}




  
function TimePicker(props){
  var curr = new Date();
  //var t = curr.toISOString(); this doesnt account for BST/GMT +1!!
  //I changed it to LocaleTimeString as below
  var t=curr.toLocaleTimeString()
  return(
    <div className="timeSelect"><label>Set Time:</label>
    <input type="time" id="appt" name="appt"
       min="00:00" max="23:59" onChange={props.onChange} defaultValue={t.slice(0,5)} required></input></div>)
}

function Calendar(props){
  
  var curr = new Date();
  var dt = curr.toISOString().substr(0,10);
  var tt=curr.toLocaleTimeString().slice(0,5);
  let [timeline,setTime]= React.useState({date:dt, time:tt, todo:props.item});
  
 function handleTime(e){
   const newObj={time:e.target.value}
   setTime(oldObj=>{
     return {...oldObj,...newObj}
    })
 }
  
 function handleDate(e){
    const newObj={date: e.target.value}
    setTime(oldObj=>{
      return {...oldObj,...newObj}
    })
  }
  return(<div className={props.style2||props.style}>
      <label >Enter deadline:</label>
  <input type="date" id="start" onChange={(e)=>handleDate(e)} defaultValue={dt} name="trip-start"
       
    min="2020-01-01" max="2021-12-31"></input><TimePicker onChange={(e)=>handleTime(e)} /><button className={props.submitStyle} onClick={props.onClick} value={JSON.stringify(timeline)}>Set Reminder</button></div>)
  
}



function MyToDoComp(props){
    const [AppState, setParams] = React.useState({userInput: "", toDoList: [], serverList:[], vis:[], greentick:[]});
    const  { dispatch } = React.useContext(AuthContext);
    /*React.useEffect(()=>{
      console.log(AppState.toDoList)
  
    })*/
    

  function clear(){
    setParams(old=>{return {...old,...initialState}})
  }


  /*updateItem(e, index){
    this.state.toDoList.splice(e,1);
    this.setState({
      toDoList: this.state.toDoList
    })
  } */
  function setTime(e){
    AppState.vis.splice(e,1,!AppState.vis[e])
    setParams(old=>{
      return {...old,...AppState.vis}
    })
    
  }
  
  function handleSubmit() {
    
    const itemsArray = AppState.userInput.split(',');
    if(itemsArray[itemsArray.length-1]==="") itemsArray.pop()
    let visi=[]
    for (let i=0;i<itemsArray.length;i++){
      visi.push(true);
      AppState.greentick.push(false)
    }
    let newObj={toDoList: itemsArray,vis:visi}
    setParams(old=>{ 
        return {...old,...newObj}

    })
    
  }
  function handleChange(e) {
    let newO={userInput: e.target.value}
    console.log(newO)
    setParams(old=>{
     return {...old, ...newO} 
    });
    console.log(AppState)
  }

  function removeReminder(){
      console.log(AppState)
  }
  
  function submitToServer(e,index){
    let obj=JSON.parse(e.target.value)
    console.log(e,index)
    AppState.greentick.splice(index,1,!AppState.greentick[index])
    setParams(old=>{
      console.log(old,obj)
      console.log({...old,obj})

      return {...old,obj}
    })

    
    
    let newObj= {...props.user};
    newObj.log.push(obj)


    const requestOptions = {
      method: 'POST',
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({data: newObj})
  }

    fetch('http://localhost:3001/addTodo', requestOptions)
       .then(res=> {return res.json()})
       //.then(resJSON=>console.log(resJSON))
       .then(resJSON=>dispatch({type: "SETREMINDER", payload: resJSON}))
    
    }
  
  
    console.log(props.user)
    //const items2=AppState.serverList.map((d,i)=><li key={i}>{d}<span className="close" onClick={()=>this.removeReminder(i)} >X</span></li>) //Changed the Key from Math.Random??
    const items3= props.user.log.map((d,i)=><li key={i}>{`Task:${d.todo}, date: ${d.date}, time:${d.time}`}<span className="close" onClick={()=>removeReminder(i)} >X<span class="tooltiptext">Delete Reminder?</span></span></li>)
    const items = AppState.toDoList.length===0?<h1>Enter some valid tasks separated by commas</h1>:AppState.toDoList.map((d,index)=>d===""?null:<div key={index}><li className="btn1" key={index}>{d}<span onClick={()=>setTime(index)} className={AppState.greentick[index]?"clock2":"clock"}>&#128337;</span><span className={AppState.greentick[index]?"greenTick1":"greenTick2"}>&#9989;</span></li><Calendar onClick={(e)=>{submitToServer(e,index)}} item={d} style={AppState.vis[index]?"calendar1":"calendar2"} style2={AppState.greentick[index]?"calendar2":"calendar1"} submitStyle={AppState.greentick[index]?"submitted":"notsubmitted"}/></div>)
    return (
      
      <div>
        <h1 id="box">Hello {props.user.username} <br></br>Your "To Do" List:</h1>
        <div id="readyToPlan"><h2>You will be emailed the following reminders:</h2><ul>{items3}</ul></div>
        <textarea
          onChange={(e)=>handleChange(e)}
          value={AppState.userInput}
          
          placeholder='Separate Tasks With Commas'
        />
        <br />
        <button id="createList" onClick={()=>handleSubmit()}>Create List</button>
        <button id="clearList" onClick={()=>clear()}>Clear List</button>
        <div id="card"><ul>{items}</ul></div>
        
                                      
                       
      </div>
    );
}



export default MyToDoComp;