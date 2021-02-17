import React from 'react';
//import Switch from 'react-bootstrap/esm/Switch';
import Login from './containers/Login'
import MyToDoList from './containers/ToDo'
import Navigate from './containers/Navbar'
import Register from './containers/Register'
import {Route, Switch} from 'react-router-dom'




function App(){
  return(
    <main>
      <Navigate />
      <Switch>
        <Route path="/" component={MyToDoList} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </main>
  )
}
export default App