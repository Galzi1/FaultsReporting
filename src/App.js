import React, { useState, useEffect } from 'react';
// import axios from 'axios'
import HomePage from './components/MainPage/MainPage'
import Login from './components/Login/Login'
// import ServerIp from './Config.js'
import { useAuthContext, AuthProvider } from './components/Login/AuthApi'
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

export default function App() {

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuthContext()
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Component />
      ) : (
          <Redirect to='/login' />
        )}
    />
  )
}
  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/' component={HomePage} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  )
}
