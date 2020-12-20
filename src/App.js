import React from 'react';
// import axios from 'axios'
import MainPage from './components/MainPage/MainPage'
import Login from './components/Login/Login'
// import ServerIp from './Config.js'
import { useAuthContext, AuthProvider } from './components/Login/AuthApi'
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  localStorage.setItem('server_ip', "http://127.0.0.1");
  localStorage.setItem('server_port', "4000");

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
              <Login/>
            </Route>
            <ProtectedRoute path='/'>
              <MainPage/>
            </ProtectedRoute>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  )
}
