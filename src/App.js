import React from 'react';
//import Switch from 'react-bootstrap/esm/Switch';
import Login from './containers/Login'
import MyToDoList from './containers/ToDo'
import Navigate from './containers/Navbar'
import Register from './containers/Register'
import Logout from './containers/Logout'
import ProtectedRoute from './containers/protected'
import {Route, Switch} from 'react-router-dom'


function App(){
  return(
    <main>
      <Navigate />
      <Switch>
        <ProtectedRoute exact={true} path="/" component={MyToDoList}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Login} />
      </Switch>
    </main>
  )
}
export default App