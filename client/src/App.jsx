import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import History from "./components/History";
import Meetings from "./components/Meetings";
import JoinMeet from "./components/JoinMeet";
import { UserContext } from "./context/UserContext";

function App() {
  const { user, isSignedIn } = useContext(UserContext);

  return (
    <>

      <BrowserRouter>
        <Routes>
          {/* Home page */}
          <Route
            exact
            path="/"
            element={isSignedIn ? <JoinMeet /> : <Home />}
          />

          {/* HISTORY PAGE */}
          <Route
            exact
            path="/history"
            element={
              isSignedIn ? <History /> : <Navigate to="/signin" replace />
            }
          />
          {/* SIGNIN AND SIGNUP PAGE */}
          <Route
            exact
            path="/signin"
            element={
              isSignedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Signin isSigninPage={true} />
              )
            }
          />

          <Route
            exact
            path="/signup"
            element={
              isSignedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Signin isSigninPage={false} />
              )
            }
          />
          {/* MEETING COMONENT */}
          <Route
            path="/meet/:roomId"
            element={isSignedIn ? <Meetings /> : <Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
