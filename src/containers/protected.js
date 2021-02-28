import React from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../App'

class ProtectedRoute extends React.Component {
//const [state, dispatch] = React.useReducer(reducer, initialState);
    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('token');
        console.log(isAuthenticated)
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;