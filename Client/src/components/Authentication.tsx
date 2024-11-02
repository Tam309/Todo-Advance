import { Link } from 'react-router-dom'
import React from 'react'

export const AuthenticationMode = Object.freeze({
    LOGIN: 'login',
    REGISTER: 'register'
})

interface AuthenticationProps {
    authenticationMode: 'login' | 'register';
}

export default function Authentication({ authenticationMode }: AuthenticationProps) {
    return (
        <div>
            <h3>{authenticationMode === AuthenticationMode.LOGIN ? "Sign in" : "Sign up"}</h3>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" />  
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" />   
                </div>
                <button>{authenticationMode === AuthenticationMode.LOGIN ? "Login" : "Submit"}</button>
                <div>
                    <Link to={authenticationMode === AuthenticationMode.LOGIN ? "/register" : "/login"}>
                        {authenticationMode === AuthenticationMode.LOGIN ? "No account ? Sign up" : "Already signed up? Sign in"}
                    </Link>
                </div>
            </form>
        </div>
    )
}