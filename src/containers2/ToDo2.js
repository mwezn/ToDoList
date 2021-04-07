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



class MyToDoList extends React.Component {
  //static contextType= AuthContext;
  
  
  
  
  constructor(props) {
    super(props);
    // change code below this line
    
    this.state={
      userInput:"",
      toDoList:[],
      serverList:[],
      vis:[],
      greentick:[]
    }
    

    


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear=this.clear.bind(this)
    this.updateItem=this.updateItem.bind(this);
    this.submitToServer=this.submitToServer.bind(this);
    this.removeReminder=this.removeReminder.bind(this);
  }

  

  componentDidMount(){
    console.log(this.context,this.context.length)
    console.log(AuthContext)
  }
  clear(){
    this.setState(initialState)
  }


  removeReminder(e){
    this.state.serverList.splice(e,1);
    this.setState({
      serverList: this.state.serverList
    })
  }
  updateItem(e, index){
    this.state.toDoList.splice(e,1);
    this.setState({
      toDoList: this.state.toDoList
    })
  }
  setTime(e){
    this.state.vis.splice(e,1,!this.state.vis[e])
    this.setState({
      vis: this.state.vis
    })
    
  }
  
  handleSubmit() {
    
    const itemsArray = this.state.userInput.split(',');
    if(itemsArray[itemsArray.length-1]==="") itemsArray.pop()
    let visi=[]
    for (let i=0;i<itemsArray.length;i++){
      visi.push(true);
      this.state.greentick.push(false)
    }
    this.setState({
      toDoList: itemsArray,
      vis: visi
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  
  submitToServer(e,index){
    
    let obj=JSON.parse(e.target.value)
    console.log(e,index)
    this.state.greentick.splice(index,1,!this.state.greentick[index])
    this.setState({
      serverList: [...this.state.serverList,Object(e.target.value)],
      //greentick: this.state.greentick
      
    })
    
    let newObj= {...this.props.user};
    newObj.log.push(obj)


    const requestOptions = {
      method: 'POST',
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({data: newObj})
  }

    fetch('http://localhost:3001/addTodo', requestOptions)
       .then(res=> res.json())
       //.then(resJSON=>dispatch({type: "SETREMINDER", payload: resJSON}))
    
  }
  render() {
    console.log(this.props.user)
    const items3= this.props.user.log.map((d,i)=><li key={i}>{`Task:${d.todo}, date: ${d.date}, time:${d.time}`}<span className="close" onClick={()=>this.removeReminder(i)} >X<span class="tooltiptext">Delete Reminder</span></span></li>)
    const items = !inputValidator(this.state.toDoList)&&this.state.toDoList.length===0?<h1>Enter some valid tasks separated by commas</h1>:this.state.toDoList.map((d,index)=>d===""?null:<div key={index}><li className="btn1" key={index}>{d}<span onClick={()=>this.setTime(index)} className={this.state.greentick[index]?"clock2":"clock"}>&#128337;</span><span className={this.state.greentick[index]?"greenTick1":"greenTick2"}>&#9989;</span></li><Calendar onClick={(e)=>{this.submitToServer(e,index)}} item={d} style={this.state.vis[index]?"calendar1":"calendar2"} style2={this.state.greentick[index]?"calendar2":"calendar1"} submitStyle={this.state.greentick[index]?"submitted":"notsubmitted"}/></div>)
    return (
      <div>
        <h1 id="box">Hello {this.props.user.username} <br></br>Your "To Do" List:</h1>
        <div id="readyToPlan"><h2>You will be emailed the following reminders:</h2><ul>{items3}</ul></div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          
          placeholder='Separate Tasks With Commas'
        />
        <br />
        <button id="createList" onClick={this.handleSubmit}>Create List</button>
        <button id="clearList" onClick={this.clear}>Clear List</button>
        <div id="card"><ul>{items}</ul></div>
        
                                      
                       
      </div>
    );
  }
}
//MyToDoList.contextType= AuthContext


export default MyToDoList;