import React from 'react';
import Login from './containers2/Login2'
import MyToDoList from './containers2/ToDo2'
import Navigate from './containers2/NavBar2'
import Register from './containers2/Register2'



export const AuthContext = React.createContext();


let userName=JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null;

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
    default:
      return state;
  }
};

function MyRoutes(props){
    if (window.location.pathname === "/") {
      return props.authed?<MyToDoList user={props.user} />:<Login />
    }
    else if (window.location.pathname === "/register"){
      return <Register />
    }
    else if(window.location.pathname ==="/login"){
      return <Login />
    }
    else {
      return <h1>YOUVE LOGGED OUT</h1>
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
export default App

//I replaced the following with <MyRoutes />
//<div className="App">{!state.isAuthenticated ? <Login /> : <MyToDoList />}</div>