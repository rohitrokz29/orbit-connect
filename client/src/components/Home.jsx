import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import GlobeImage from "../assets/images/globe.jpeg";
import ConnectionImage from "../assets/images/securecon.jpeg";
import MessageImage from "../assets/images/livemessage.jpeg";
import DataImage from "../assets/images/dataSec.jpeg";
import "./styles/home.css";
const Home = () => {
  const { user, isSignedIn } = useContext(UserContext);
  const features = [
    { name: "Connect Globally", image: GlobeImage },
    { name: "Secure Connection", image: ConnectionImage },
    { name: "Live Messaging", image: MessageImage },
    { name: "Data Security", image: DataImage },
  ];
  return (
    <>
      <main>
        <div className="top-box">
          <div className="heading">
            <span className="heading-text">
              <Link to={"/"} className="brand">
                Orbit Connect
              </Link>
              <br />
              Join us at the earliest and connect with your close ones
              throughout the globe and share valuable time together.
            </span>
            <div className="buttons">
              <Link className="button " to="/signup">
                Get Started
              </Link>
              <Link className="button " to="/signin">
                Already a User
              </Link>
            </div>
          </div>
          <SideImage/>
        </div>
        <div className="features">
          {features.map((property) => {
            return (
              <div className="prop-card" key={`${property.name}`}>
                <img className="prop-image" src={property.image} />
                <span className="prop-name">{property.name}</span>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
export default Home;

 export const SideImage = () => {
  return (
    <div className="side-image">
      <img className="image" src={GlobeImage} />
    </div>
  );
};
