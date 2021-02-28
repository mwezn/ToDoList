import './App2.css';
import React from'react';

const initialState={userInput:"",toDoList:[]}


function inputValidator(arr){
  var Regex=/^[a-zA-Z0-9_]+$/g
  var result=arr.some(e=> Regex.test(e));
  return result
}

/*let cUser=localStorage.getItem('user')
let cUser2=JSON.parse(cUser)
console.log(cUser2)
*/


  
function TimePicker(props){
  var curr = new Date();
  var t = curr.toISOString();
  return(
    <div className="timeSelect"><label>Set Time:</label>
    <input type="time" id="appt" name="appt"
       onChange={props.onChange} defaultValue={t.slice(11,16)} required></input></div>)
}

function Calendar(props){
  
  var curr = new Date();
  var dt = curr.toISOString().substr(0,10);
  var tt=curr.toISOString().slice(11,16);
  let [timeline,setTime]= React.useState({date:dt, time:tt});
  //I want to round the above default time to next closest half hour!
  console.log(timeline)

 function handleTime(e){
   const newObj={time:e.target.value}
   setTime(oldObj=>{
     return {...oldObj,...newObj}
    })
   console.log(timeline)
 }
  
 function handleDate(e){
    const newObj={date: e.target.value}
    setTime(oldObj=>{
      return {...oldObj,...newObj}
    })
    console.log(newObj);
  }
 function handleChange(e){
   console.log(timeline)
 }
  return(<div className={props.style}>
  <label >Enter deadline:</label>
  <input type="date" id="start" onChange={(e)=>handleDate(e)} defaultValue={dt} name="trip-start"
       
    min="2020-01-01" max="2021-12-31"></input><TimePicker onChange={(e)=>handleTime(e)} /><button className="timeSelect" onClick={(e)=>handleChange(e)}>Set Reminder</button></div>)
  
}

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    // change code below this line
    this.state={
      userInput:"",
      toDoList:[],
      calendarVisible: false,
      vis:[]
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear=this.clear.bind(this)
    this.updateItem=this.updateItem.bind(this);
  }
  clear(){
    this.setState(initialState)
  }
  updateItem(e){
    this.state.toDoList.splice(e,1);
    this.setState({
      toDoList: this.state.toDoList
    })
  }
  setTime(e){
    this.state.vis.splice(e,1,!this.state.vis[e])
    this.setState({
      calendarVisible: !this.state.calendarVisible
    })
    
  }
  
  handleSubmit() {
    
    const itemsArray = this.state.userInput.split(',');
    console.log(itemsArray.length);
    console.log(itemsArray)
    if(itemsArray[itemsArray.length-1]==="") itemsArray.pop()
    let visi=[]
    for (let i=0;i<itemsArray.length;i++){
      visi.push(true)
      
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
  render() {
    console.log(this.props.user.username)
    
    const items = !inputValidator(this.state.toDoList)&&this.state.toDoList.length===0?<h1>Enter some valid tasks separated by commas</h1>:this.state.toDoList.map((d,index)=>d===""?null:<div key={index}><li className="btn1" key={index}>{d}<span onClick={()=>this.setTime(index)} className="clock">&#128337;</span><span className="close" onClick={()=>this.updateItem(index)}>x</span></li><Calendar style={this.state.vis[index]?"calendar1":"calendar2"}/></div>)
    return (
    
      <div className="toDoList">
        <h1 id="box">Hello {this.props.user.username} <br></br>Your "To Do" List:</h1>
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




  

export default MyToDoList;