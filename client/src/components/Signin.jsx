import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { SideImage } from "./Home";
import { UserContext } from "../context/UserContext";
import "./styles/sigin.css";
const Signin = ({ isSigninPage }) => {
  const { Signin, Signup } = useContext(UserContext);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);
  const handleSubmit = (e) => {
    // console.log({
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    //   name: nameRef.current.value,
    //   confPassword: confPasswordRef.current.value,
    // });
    e.preventDefault();
    if (isSigninPage) {
      Signin({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      Signup({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
        confPassword: confPasswordRef.current.value,
      });
    }
  };
  return (
    <main>
      <div className="top-box">
        <div className="heading">
          <span className="heading-text">Welcome to Orbit Connect</span>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="card">
                  <h2 className="card-title text-center">
                    {isSigninPage ? "Signin" : "Signup"}{" "}
                    <Link to="/">at Orbit Connect</Link>
                  </h2>
                  <div className="card-body py-md-4">
                    <form>
                      <div className="form-group">
                        {!isSigninPage && (
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            ref={nameRef}
                          />
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          ref={emailRef}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          ref={passwordRef}
                        />
                      </div>
                      <div className="form-group">
                        {!isSigninPage && (
                          <input
                            type="password"
                            className="form-control"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            ref={confPasswordRef}
                          />
                        )}
                      </div>
                      <div className="buttons">
                        <Link
                          id="link"
                          to={isSigninPage ? "/signup" : "/signin"}
                          className="link"
                        >
                          {isSigninPage ? "Signup" : "Signin"}
                        </Link>
                        <button
                          id="submit-button"
                          type="submit"
                          className="button"
                          onClick={handleSubmit}
                        >
                          {isSigninPage
                            ? "Signin to Account"
                            : "Create Account"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideImage />
      </div>
    </main>
  );
};

export default Signin;
