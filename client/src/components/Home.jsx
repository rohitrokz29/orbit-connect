import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Home = () => {
  const { user, isSignedIn } = useContext(UserContext);
  return (
    <>
    <main>
      <div className="top-box">
        <div className='heading'>
          <span className="heading-text">
            Join us and connect with your close ones throughout the globe and share valuable time together.
          </span>
          <div className="buttons">
            <Link className="button " to="/signup">Get Started</Link>
            <Link className="button " to="/signin">Already a User</Link>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};
export default Home;
