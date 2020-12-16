import React, { useState, useEffect } from 'react';
// import axios from 'axios'
import MainPage from './components/MainPage/MainPage'
import Login from './components/Login/Login'
import ServerConnection from './utils/ServerConnection';
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
  const server_ip = "http://127.0.0.1"
  const server_port = "4000"

  const serverConnection = new ServerConnection(server_ip, server_port);

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
            <Route path='/login'>
              <Login serverConnection={serverConnection}/>
            </Route>
            <ProtectedRoute path='/'>
              <MainPage serverConnection={serverConnection}/>
            </ProtectedRoute>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  )
}
