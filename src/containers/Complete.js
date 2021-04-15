import './App.css'
import React from 'react';
import { AuthContext } from '../App'



function Complete(props){
    const { dispatch } = React.useContext(AuthContext);
    function removeOverdue(i) {
        let newObj = { ...props.user }
        let item = newObj.overdue.splice(i, 1)
        console.log(item)
        const requestOptions = {
          method: 'POST',
          //mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: newObj, Item: item })
        }
    
        fetch('http://localhost:3001/removeOverdue', requestOptions)
          .then(res => { return res.json() })
          .then(resJSON => dispatch({ type: "SETREMINDER", payload: resJSON }))
      }



    const items2 = props.user.log.map((d, i) => <li key={i}>{`Task:${d.todo}, date: ${d.date}, time:${d.time}`}<span className="close" onClick={() => removeOverdue(i)} >X<span class="tooltiptext">Delete Reminder?</span></span></li>)
    return (
      <div>
        <h1 id="box">Your completed tasks:</h1>
        <ul className="NavBar">
        </ul>
      </div>
  );
  }
  
  
  
    export default Complete