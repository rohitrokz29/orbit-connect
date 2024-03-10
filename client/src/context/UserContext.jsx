import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useReducer,
} from "react";
import { Navigate } from "react-router-dom";
import { baseUrl, headers, properties } from "../assets/api";
export const UserContext = createContext();

/**
 * state={
 * user:{
 * email,name,id
 * }
 * }
 */
export const UserState = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState("");
  const userReducerFunction = (state, action) => {
    switch (action.type) {
      case "signin":
        localStorage.setItem("orbit_user_data", JSON.stringify(action.payload));
        setIsSignedIn((isSignedIn) => true);
        <Navigate to="/" replace />;
        return { user: action.payload };
      case "signout":
        localStorage.clear();
        setIsSignedIn((isSignedIn) => false);
        return { user: null };
      default:
        setIsSignedIn((isSignedIn) => false);
        return { ...state };
    }
  };
  const [state, userDispatch] = useReducer(userReducerFunction, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("orbit_user_data"));
    console.log(user);
    if (user?.authTokenExpiry <= Date.now() || !user) {
      userDispatch({ type: "signout" });
    } else {
      userDispatch({ type: "signin", payload: user });
    }
  }, []);

  const Signup = ({ email, name, password, confPassword }) => {
    if (password.length < 10) {
      setError("Choose a strong password");
      return;
    }
    if (!email || !name) {
      setError("Enter Valid Details");
      return;
    }
    if (password !== confPassword) {
      setError("Passwords Doesn't match");
      return;
    }
    console.log({ email, name, password, confPassword });

    fetch(`${baseUrl}signup`, {
      method: "POST",
      credentials: properties.credentials,
      headers,
      body: JSON.stringify({ email, name, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          userDispatch({
            type: "signin",
            payload: { email, name, id: res.id },
          });
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  const Signin = ({ email, password }) => {
    if (!email || !password) {
      setError("Invalid Details");
      console.log("error");
      return;
    }
    fetch(`${baseUrl}signin`, {
      method: "POST",
      credentials: properties.credentials,
      headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res) {
          userDispatch({
            type: "signin",
            payload: { email, name: res.name, id: res.id },
          });
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const SignOut = () => {
    fetch(`${baseUrl}signout`, {
      method: "DELETE",
      credentials: properties.credentials,
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          userDispatch({ type: "signout" });
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        isSignedIn,
        error,
        setError,
        Signin,
        Signup,
        SignOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
