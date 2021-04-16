import './App.css'
import React from 'react';
import { AuthContext } from '../App'



function Complete(props){
    const { dispatch } = React.useContext(AuthContext);
    function removeDone(i) {
        let newObj = { ...props.user }
        let item = newObj.done.splice(i, 1)
        console.log(item)
        const requestOptions = {
          method: 'POST',
          //mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: newObj, Item: item })
        }
    
        fetch('http://localhost:3001/removeDone', requestOptions)
          .then(res => { return res.json() })
          .then(resJSON => dispatch({ type: "SETREMINDER", payload: resJSON }))
      }



    const items2 = props.user.done.map((d, i) => <li className="completedList" key={i}>{`Task:${d.todo}, date: ${d.date}, time:${d.time}`}<span className="close" onClick={() => removeDone(i)} >X<span class="tooltiptext">Delete?</span></span></li>)
    return (
      <div>
        <h1 id="box">Your completed tasks:</h1>
        <ul>
          {items2}
        </ul>
      </div>
  );
  }
  
  
  
    export default Complete