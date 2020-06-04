import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'

const AuthContext = React.createContext();

const permission = {
    ADMIN: "admin",
    GUEST: "guest",
}

const getLocalStorage = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key))
        if (value.expire < new Date()) return null

        return value.id
    } catch{
        return null
    }
}

export const getAuth = () => {
    return getLocalStorage('auth')
}
export const logOut = () => {
    localStorage.removeItem('auth');
    window.history.go('/login')
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getLocalStorage('auth'))

    const history = useHistory()

    useEffect(() => {
        if (auth === permission.ADMIN || auth === permission.GUEST) {
            const date = new Date()
            localStorage.setItem("auth", JSON.stringify({ value: auth, id:1, expire: date.setHours(date.getHours() + 12) }))
            history.push('/')
        }
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
