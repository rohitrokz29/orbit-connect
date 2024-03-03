import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import History from "./components/History";
import Meetings from "./components/Meetings";
import JoinMeet from "./components/JoinMeet";
import { UserContext } from "./context/UserContext";
import { SocketState } from "./context/SocketContext";
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
            element={
              isSignedIn ? (
                <SocketState>
                  <JoinMeet />
                </SocketState>
              ) : (
                <Home />
              )
            }
          />

          {/* HISTORY PAGE */}
          <Route
            exact
            path="/history"
            element={
              isSignedIn ? (
                <SocketState>
                  <History />
                </SocketState>
              ) : (
                <Navigate to="/signin" replace />
              )
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
            element={
              isSignedIn ? (
                <SocketState>
                  <Meetings />
                </SocketState>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
