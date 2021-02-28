
//import { AuthContext } from '../App2'
const My_Token= localStorage.getItem('token');
console.log(My_Token)



function Navigate(props){
  return props.authed?(
    <div>
      <ul className="NavBar">
        <li><a href="/" onClick={(e)=>e.preventDefault()}>Home</a></li>
        <li><a href="/logout" onClick={()=>localStorage.removeItem('token')}>Logout</a></li>
      </ul>
    </div>):(
      <div>
      <ul className="NavBar">
        <li><a href="/">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
)
}



  export default Navigate