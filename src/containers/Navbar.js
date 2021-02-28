import {Link} from 'react-router-dom';
const My_Token= localStorage.getItem('token');

function Navigate(){
  return My_Token?(
    <div>
      <ul className="NavBar">
        <li><a href="/">Home</a></li>
        <li><a href="/logout" onClick={()=>localStorage.removeItem('token')}>Logout</a></li>
      </ul>
    </div>):(
      <div>
      <ul className="NavBar">
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
)

}

  export default Navigate

 