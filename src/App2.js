import React from 'react';
import Login from './containers2/Login2'
import MyToDoComp from './containers2/Todo'
import MyToDoList from './containers2/ToDo2'
import Navigate from './containers2/NavBar2'
import Register from './containers2/Register2'



const AuthContext = React.createContext();


let userName=JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null;
console.log("YOUR DISPtcth is"+ userName)
const initialState = {
  isAuthenticated: false,
  //user: localStorage.getItem('user'),
  user: userName,
  token: localStorage.getItem('token'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case "SETREMINDER":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    default:
      return state;
  }
};

function MyRoutes(props){
    if (window.location.pathname === "/") {
      return props.authed?<MyToDoComp user={props.user} />:<Login />
    }
    else if (window.location.pathname === "/register"){
      return <Register />
    }
    else if(window.location.pathname ==="/login"){
      return <Login />
    }
    else if(window.location.pathname==="/logout"){
      return <h1>YOUVE LOGGED OUT</h1>
    }
    else{
      return <h1>404 Not Found!</h1>
    }
    

}

function App(){
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return(
    <AuthContext.Provider
    value={{
      state,
      dispatch
    }}
  > <Navigate authed={state.token}/>
    <MyRoutes authed={state.token} user={state.user}/>
  </AuthContext.Provider>
)
}
export {App}
export {AuthContext}

//I replaced the following with <MyRoutes />
//<div className="App">{!state.isAuthenticated ? <Login /> : <MyToDoList />}</div>