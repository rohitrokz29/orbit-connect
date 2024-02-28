import React, { createContext, useEffect, useContext, useState } from 'react';
import { baseUrl, headers, properties } from '../assets/api';


export const UserContext = createContext();

export const UserState = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [state, userDispatch] = useReducer(userReducerFunction, { user: null });
    const [error, setError] = useState("");
    const userReducerFunction = ({ state, action }) => {
        switch (action.type) {
            case 'signin':
                setIsSignedIn(isSignedIn => !isSignedIn);
                return { user: action.payload };
            case 'signout':
                localStorage.clear();
                setIsSignedIn(isSignedIn => !isSignedIn);
                return { user: null };
            default:
                setIsSignedIn(isSignedIn => false);
                return { ...state };
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('orbit_user_data'));
        if (user.authTokenExpiry <= Date.now()) {
            userDispatch({ type: 'signout' });
        }
        else {
            userDispatch({ type: 'signin', payload: user });
        }
    }, []);


    const Signup = ({ email, name, password }) => {
        let res = fetch(`${baseUrl}signup`, {
            method: "POST",
            properties,
            headers,
            body: JSON.stringify({ email, name, password }),
        })
            .then(res => res.json())
            .then((res) => {
                if (res.status === 200) {
                    userDispatch({ type: "signin", payload: { email, name, id: res.body.id } });
                    return;
                }
            })
            .catch(err => {
                setError(err.message);
            })
    }

    const Signin = ({ email, password }) => {
        let res = fetch(`${baseUrl}signin`, {
            method: "POST",
            properties,
            headers,
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then((res) => {
                if (res.status === 200) {
                    userDispatch({ type: "signin", payload: { email, name: res.body.name, id: res.body.id } });
                    return;
                }
            })
            .catch(err => {
                setError(err.message);
            })
    }
    const SignOut = () => {
        fetch(`${baseUrl}signout`, {
            method: "DELETE",
            properties,
            headers
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    userDispatch({ type: 'signout' });
                }
            })
            .catch((err) => setError(err.message))
        userDispatch({ type: "signout" });
    }

    return (
        <UserContext.Provider valuse={{
            ...state,
            isSignedIn,
            error,
            setError,
            Signin,
            Signup,
            SignOut
        }}>
            {children}
        </UserContext.Provider>
    )
}
